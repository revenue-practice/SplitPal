const { DBTABLES } = require('../utils/constants');
const { executeAsyncQueryWithoutLock } = require('../utils/helper');
const { pool } = require('./pool');
const { v4: uuidv4 } = require('uuid');

const isExistingUserModel = async (email) => {
    try {
        const query = `SELECT users.id, auth.hashed_password FROM ${DBTABLES.users} users JOIN ${DBTABLES.auth} auth 
                       ON users.id = auth.user_id WHERE users.email = $1 LIMIT 1`;

        const response = await pool.query(query, [email]);
        if (response.rowCount) return { isUser: true, data: response.rows[0] };
    }
    catch (error) {
        return { isUser: false };
    }
    return { isUser: false };
};

const createUserModel = async (email, password, fName, lName) => {
    try {
        const userId = uuidv4(), authId = uuidv4(), currentTime = new Date().toISOString();
        const userQuery = `INSERT INTO ${DBTABLES.users} VALUES ($1, $2, $3, $4, $5, $6)`;
        const userQueryParams = [userId, fName, lName, email, currentTime, currentTime];

        const authQuery = `INSERT INTO ${DBTABLES.auth} VALUES ($1, $2, $3, $4, $5)`;
        const authQueryParams = [authId, password, userId, currentTime, currentTime];

        const result = await Promise.all([executeAsyncQueryWithoutLock(userQuery, userQueryParams), executeAsyncQueryWithoutLock(authQuery, authQueryParams)]);
        if (result.length === 2 && result[0].rowCount && result[1].rowCount) return { code: 201 };

        return { code: 500 }
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    isExistingUserModel,
    createUserModel
};