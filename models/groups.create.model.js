const { DBTABLES, internalServerErrorCode, createRecordSuccessCode } = require('../utils/constants');
const { executeAsyncQueryWithoutLock } = require('../utils/helper');
const { v4: uuidv4 } = require('uuid');

const createGroupModel = async (name, description, owner_id) => {
    const id = uuidv4(), currentTime = new Date().toISOString();
    try {
        const query = `INSERT INTO ${DBTABLES.groups} VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const queryParams = [id, name, description, owner_id, true, currentTime, currentTime];

        const response = await executeAsyncQueryWithoutLock(query, queryParams);
        if(response.rowCount) return createRecordSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createGroupModel
};