var expect = require('chai').expect;

var Request = require('./assets/request');
var hosts = require('../');

var fs = require('fs');
var path = require('path');

var load = function (filename) {
  return fs.readFileSync(path.join(__dirname, './assets/' + filename)).toString();
}

describe('url', function () {
  it('http://not-match.com', function () {
    var request = new Request('http://no-match.com');
    var config = load('hosts');
    hosts(config)(request);
    expect(request.url).to.be.equal('http://no-match.com');
    expect(request.headers).to.be.deep.equal({});
  });
  it('http://match.com', function () {
    var request = new Request('http://match.com');
    var config = load('hosts');
    request = hosts(config)(request);
    expect(request.url).to.be.equal('http://192.168.10.12:80/');
    expect(request.headers).to.be.deep.equal({Host: 'match.com'});
  });
  it('https://match.com:8080/path/to?search=foobar#hash', function () {
    var request = new Request('https://match.com:8080/path/to?search=foobar#hash');
    var config = load('hosts');
    request = hosts(config)(request);
    expect(request.url).to.be.equal('https://192.168.10.12:8080/path/to?search=foobar#hash');
    expect(request.headers).to.be.deep.equal({Host: 'match.com'});
  });
  it('http://space-match.com', function () {
    var request = new Request('http://space-match.com');
    var config = load('hosts');
    request = hosts(config)(request);
    expect(request.url).to.be.equal('http://192.168.10.12:80/');
    expect(request.headers).to.be.deep.equal({Host: 'space-match.com'});
  });
  it('http://comment.com', function () {
    var request = new Request('http://comment.com');
    var config = load('hosts');
    request = hosts(config)(request);
    expect(request.url).to.be.equal('http://comment.com');
    expect(request.headers).to.be.deep.equal({});
  });
});
