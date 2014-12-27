var expect = require('chai').expect;

var Request = require('./assets/request');
var hosts = require('../');
var config = require('fs').readFileSync(require('path').join(__dirname, './assets/hosts')).toString();



describe('url', function () {
  it('http://not-match.com', function () {
    var request = new Request('http://no-match.com');
    hosts(config)(request);
    expect(request.url).to.be.equal('http://no-match.com');
    expect(request.headers).to.be.deep.equal({});
  });
  it('http://match.com', function () {
    var request = new Request('http://match.com');
    request = hosts(config)(request);
    expect(request.url).to.be.equal('http://192.168.10.12:80/');
    expect(request.headers).to.be.deep.equal({Host: 'match.com'});
  });
  it('https://match.com:8080/path/to?search=foobar#hash', function () {
    var request = new Request('https://match.com:8080/path/to?search=foobar#hash');
    request = hosts(config)(request);
    expect(request.url).to.be.equal('https://192.168.10.12:8080/path/to?search=foobar#hash');
    expect(request.headers).to.be.deep.equal({Host: 'match.com'});
  });
});
