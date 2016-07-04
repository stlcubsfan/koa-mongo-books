const books = require('../books');
const Boom = require('boom');
books.id = function (string) {
  return string;
};


exports.list = function *() {
  var results = yield books.find({});
  this.body = results;
};

exports.one = function *(next) {
  var results = yield books.findOne(this.params.id);
  if (!results) {
    this.throw(404, "Book not found");
  } else {
    this.body = results;
  }

};
