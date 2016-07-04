const db = require('./db'),
  wrap = require('co-monk');

module.exports = wrap(db.get('books'));
