# superagent-hosts

extra hosts file for nodejs superagent requests

[![Build Status](https://travis-ci.org/imyelo/superagent-hosts.svg)](https://travis-ci.org/imyelo/superagent-hosts)

## Example
./hosts
```
192.168.10.12 foobar.com
```

./app.js
```javascript
var request = require('superagent');
var hosts = require('superagent-hosts');
var config = require('fs').readFileSync('./hosts').toString();
request
  .get('http://foobar.com/path/to')
  .use(hosts(config))
  .end(function (err, res) {
    // ...
  });
```

## License
the MIT License
