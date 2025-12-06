const { DBTABLES, noDataReturnedErrorCode, createRecordSuccessCode, acceptedSuccessCode } = require("../utils/constants");
const { v4: uuidv4 } = require('uuid');
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const createExpenseModel = async (groupId, payerId, name, description, totalAmount, memberParticipation) => {
    let result = 0;
    const expenseId = uuidv4(), splitsId = uuidv4(), currentTime = new Date().toISOString();
    const expenseQuery = `INSERT INTO ${DBTABLES.expenses} VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const splitsQuery = `INSERT INTO ${DBTABLES.splits} VALUES ($1, $2, $3, $4, $5, $6)`;
    const expenseQueryParams = [expenseId, name, description, groupId, payerId, totalAmount, currentTime, currentTime];

    try {
        const response = await executeAsyncQueryWithoutLock(expenseQuery, expenseQueryParams);
        if(response.rowCount) {
            for (let member of memberParticipation) {
                const { receiver_id: receiverId, amount } = member;
                const splitsQueryParams = [splitsId, expenseId, receiverId, amount, currentTime, currentTime];

                try {
                    const response = await executeAsyncQueryWithoutLock(splitsQuery, splitsQueryParams);
                    if (response.rowCount) result += 1;
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        }

        if(result === memberParticipation.length) return createRecordSuccessCode;

        return noDataReturnedErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

const editExpenseModel = async (groupId, payerId, expenseId, name, description, totalAmount, memberParticipation) => {
    try {
        let result = 0;
        const currentTime = new Date().toISOString();

        const expenseQuery = `UPDATE ${DBTABLES.expenses} SET name = $1, description = $2, total_amount = $3, updated_at = $4 WHERE group_id = $5 and id = $6 and payer_id = $7`;
        const expenseQueryParams = [name, description, totalAmount, currentTime, groupId, expenseId, payerId];

        const response = await executeAsyncQueryWithoutLock(expenseQuery, expenseQueryParams);
        if(response.rowCount) {
            for (let member of memberParticipation) {
                const { receiver_id: receiverId, amount } = member;

                const splitsQuery = `UPDATE ${DBTABLES.splits} SET amount = $1, updated_at = $2 WHERE expense_id = $3 and receiver_id = $4`;
                const splitsQueryParams = [amount, currentTime, expenseId, receiverId];

                try {
                    const response = await executeAsyncQueryWithoutLock(splitsQuery, splitsQueryParams);
                    if (response.rowCount) result += 1;
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        }

        if(result === memberParticipation.length) return acceptedSuccessCode;

        return noDataReturnedErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createExpenseModel,
    editExpenseModel
};