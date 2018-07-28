const properties = require('../util/properties');

function corsPermission() {
    this.permission = function(req, res, next) {
        res.header(properties.CORS_HEADERS_ALLOW_ORIGIN_HEADER, properties.CORS_HEADERS_ALLOW_ORIGIN_VALUE);
        res.header(properties.CORS_HEADERS_ALLOW_HEADERS_HEADER, properties.CORS_HEADERS_ALLOW_HEADERS_VALUE);
        res.header(properties.CORS_HEADERS_ALLOW_METHODS_HEADER, properties.CORS_HEADERS_ALLOW_METHODS_VALUE);
        next();
    }
}

module.exports = new corsPermission();