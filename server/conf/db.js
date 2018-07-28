var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'librafydb',
    user: 'librafy',
    password: 'l1br44u'
});