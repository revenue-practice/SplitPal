const { DBTABLES, createRecordSuccessCode, noDataReturnedErrorCode } = require("../utils/constants");
const { v4: uuidv4 } = require('uuid');
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const addMemberToGroupModel = async (groupId, memberId) => {
    const id = uuidv4(), currentTime = new Date().toISOString();
    const query = `INSERT INTO ${DBTABLES.groupMembers} VALUES ($1, $2, $3, $4, $5, $6)`;
    const queryParams = [id, memberId, groupId, true, currentTime, currentTime];

    try {
        const response = await executeAsyncQueryWithoutLock(query, queryParams);
        if(response.rowCount) return createRecordSuccessCode;

        return noDataReturnedErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    addMemberToGroupModel
};