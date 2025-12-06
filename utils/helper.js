const { pool } = require('../models/pool');
const jwt = require('jsonwebtoken');
const authSecret = process.env.JWT_SECRET;

const isNeitherNullNorUndefined = (val) => val !== undefined && val !== null;
const isEitherNullOrUndefined = (val) => !isNeitherNullNorUndefined(val);
const isString = (val) => typeof val === 'string';
const isEmptyString = (val) => isString(val) && val === "";
const isValidString = (val) => isNeitherNullNorUndefined(val) && isString(val) && !isEmptyString(val);
const isInteger = (val) => typeof val === 'number' && val !== NaN;
const isValidInteger = (val) => isNeitherNullNorUndefined(val) && isInteger(val);
const isArray = (val) => isEitherNullOrUndefined(val) && Array.isArray(val) && val.length;
const executeAsyncQueryWithoutLock = async (query, params) => {
    return await pool.query(query, params);
}
const isUserAuthenticated = (req) => {
    const authHeader = req.cookies['Authorisation'];
    if(isValidString(authHeader)) {
        const [scheme, token] = authHeader.split(" ");
        if(scheme === "Bearer" && jwt.verify(token, authSecret)) return true;
    }
    return false;
}
const allowUserForAction = (req, res, next) => {
    const authHeader = req.cookies['Authorisation'];
    if(isValidString(authHeader)) {
        const [scheme, token] = authHeader.split(" ");
        if(scheme === "Bearer" && jwt.verify(token, authSecret)) next();
    }
}

module.exports = {
    isNeitherNullNorUndefined,
    isEitherNullOrUndefined,
    isString,
    isEmptyString,
    isValidString,
    isInteger,
    isValidInteger,
    isArray,
    executeAsyncQueryWithoutLock,
    isUserAuthenticated,
    allowUserForAction
};