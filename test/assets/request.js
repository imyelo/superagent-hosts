var Request = function (url) {
  this.url = url;
  this.headers = {};
  return this;
};
Request.prototype.set = function (key, value) {
  this.headers[key] = value;
};

module.exports = Request;