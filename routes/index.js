const books = require('../books');
const Boom = require('boom');
const uuid = require('node-uuid');
const parse = require('co-body');

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

exports.create = function *(next) {
  var id = uuid.v1();
  var input = yield parse(this);
  var book = {
    _id: id,
    title: input.title,
    author: input.author,
    isbn: input.isbn
  }
  yield books.insert(book);
  this.body = book;
};

exports.update = function *(next) {
  var input = yield parse(this);
  var result = yield books.updateById(this.params.id, {
    title: input.title,
    author: input.author,
    isbn: input.isbn
  });
  this.response.status = 204;

};

exports.delete = function *(next) {
  yield books.remove({"_id": this.params.id});
  this.response.status = 204;
}
