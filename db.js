const monk = require('monk');
module.exports = monk('localhost/hapi-rest-mongo');
