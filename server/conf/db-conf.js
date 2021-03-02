'use strict'

var dbConfig = {
    user: 'galcober',
    host: 'localhost',
    database: 'galcoblog',
    password: 'Hoteldusk05',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
};

module.exports = {
    getDatabaseConnectionSettings: function () {
        return dbConfig;
    }
};