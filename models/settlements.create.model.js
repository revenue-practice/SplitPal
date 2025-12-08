const { DBTABLES, createRecordSuccessCode, noDataReturnedErrorCode, internalServerErrorCode } = require("../utils/constants");
const { v4: uuidv4 } = require('uuid');
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const userSettlementModel = async (fromUserId, toUserId, groupId, expenseId, amount) => {
    const id = uuidv4(), currentTime = new Date().toISOString();
    const query = `INSERT INTO ${DBTABLES.settlements} VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const queryParams = [id, fromUserId, toUserId, groupId, expenseId, amount];
    try {
        const response = await executeAsyncQueryWithoutLock(query, queryParams);
        if(response.rowCount) return createRecordSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};  

module.exports = {
    userSettlementModel
};