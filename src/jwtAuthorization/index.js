const jwt  = require('jsonwebtoken');

const makeJwtSignToken = require('./jwtSignToken');
const makeJwtVerifyToken = require('./jwtVerifyToken');

const jwtSignToken = makeJwtSignToken({jwt});
const jwtVerifyToken = makeJwtVerifyToken({jwt});

module.exports = {
    jwtSignToken,jwtVerifyToken
}