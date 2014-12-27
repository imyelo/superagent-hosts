var fs = require('fs');
var request = require('superagent');
var hosts = require('../');

request.get('http://dev.com')
  .use(hosts(fs.readFileSync('./hosts').toString()))
  .end(function (err, res) {
    console.log(res.text);
  });
