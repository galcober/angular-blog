/* CORS */
exports.CORS_HEADERS_ALLOW_ORIGIN_HEADER = 'Access-Control-Allow-Origin';
exports.CORS_HEADERS_ALLOW_ORIGIN_VALUE = '*';
exports.CORS_HEADERS_ALLOW_HEADERS_HEADER = 'Access-Control-Allow-Headers';
exports.CORS_HEADERS_ALLOW_HEADERS_VALUE = 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Content-Type, Origin, X-Requested-With, Accept, Authorization';
exports.CORS_HEADERS_ALLOW_METHODS_HEADER = 'Access-Control-Allow-Methods';
exports.CORS_HEADERS_ALLOW_METHODS_VALUE = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';

/* DB CONFIGURATION */

exports.DB_USER = 'galcober';
exports.DB_HOST = 'localhost';
exports.DB_NAME = 'galcoblog';
exports.DB_PASSWORD = 'Hoteldusk05';
exports.DB_PORT = 5432;
exports.DB_MAX_CONNECTIONS = 10;
exports.DB_IDLE_TIMEOUT_MILLIS = 30000;
exports.DB_CONNECTION_TIMEOUT_MILLIS = 5000;