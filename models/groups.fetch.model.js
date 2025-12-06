const { DBTABLES, acceptedSuccessCode, internalServerErrorCode } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const fetchAllUsersModel = async (groupId) => {
    const query = `SELECT * FROM ${DBTABLES.groupMembers} WHERE group_id = $1 LIMIT 100`;
    try {
        const response = await executeAsyncQueryWithoutLock(query, [groupId]);
        if(response.rowCount) return {
            code: 200,
            data: response.rows
        };

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    fetchAllUsersModel
};