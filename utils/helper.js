const { pool } = require('../models/pool');
const jwt = require('jsonwebtoken');
const authSecret = process.env.JWT_SECRET;

const isNeitherNullNorUndefined = (val) => val !== undefined && val !== null;
const isEitherNullOrUndefined = (val) => !isNeitherNullNorUndefined(val);
const isEmptyString = (val) => val === "";
const isValidString = (val) => isNeitherNullNorUndefined(val) && !isEmptyString(val);
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
    isEmptyString,
    isValidString,
    executeAsyncQueryWithoutLock,
    isUserAuthenticated,
    allowUserForAction
};