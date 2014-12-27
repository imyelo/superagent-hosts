var url = require('url');

function parser (hosts) {
  var parsed = [];
  hosts = (hosts || '').split('\n');
  hosts.forEach(function (line) {
    var match = line.match(/([^\s]*)(?:\s*)([^\s]*)/);
    if (match && match.length === 3) {
      parsed.push({
        domain: match[1],
        cname: match[2]
      })
    }
  });
  return parsed;
}

function match (hosts, domain) {
  hosts.forEach(function (group) {
    if (group.domain === domain) {
      domain = group.cname;
    }
  });
  return domain;
}

module.exports = function (hosts) {
  hosts = parser(hosts);
  return function (request) {
    var uri = url.parse(request.url);
    var cname = match(hosts, uri.hostname);

    if (cname !== uri.hostname) {
      request.url = uri.protocol + '//' + cname + ':' + (uri.port || '80') + uri.path + uri.hash;
      request.set('Host', uri.hostname);
    }

    return request;
  };
}