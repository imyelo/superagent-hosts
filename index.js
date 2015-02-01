var url = require('url');
var Hosts = require('hosts-parser').Hosts;

module.exports = function (hosts) {
  hosts = new Hosts(hosts);
  return function (request) {
    var uri = url.parse(request.url);
    var ip = hosts.resolve(uri.hostname);

    if (ip) {
      request.url = uri.protocol + '//' + ip + ':' + (uri.port || '80') + (uri.path || '') + (uri.hash || '');
      request.set('Host', uri.hostname);
    }

    return request;
  };
}