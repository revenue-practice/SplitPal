const { DBTABLES, createRecordSuccessCode, internalServerErrorCode } = require("../utils/constants");
const { v4: uuidv4 } = require('uuid');
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const userSettlementModel = async (fromUserId, toUserId, groupId, settlements) => {
    const currentTime = new Date().toISOString();
    const query = `INSERT INTO ${DBTABLES.settlements} VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    let result = 0;

    try {
        for(const settlement of settlements) {
            const { id: expenseId, amount } = settlement;
            const id = uuidv4(), queryParams = [id, fromUserId, toUserId, expenseId, groupId, amount, currentTime, currentTime];
            const response = await executeAsyncQueryWithoutLock(query, queryParams);

            if(response.rowCount) result += 1;
        }
        
        if(result === settlements.length) return createRecordSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};  

module.exports = {
    userSettlementModel
};