const { DBTABLES, internalServerErrorCode, acceptedSuccessCode } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const fetchGroupsModel = async (userId) => {
    const query = `SELECT id, name, description FROM ${DBTABLES.groups} WHERE owner_id = $1 and is_active = true 
        ORDER BY created_at DESC LIMIT 100`;
    try {
        const response = await executeAsyncQueryWithoutLock(query, [userId]);
        if(response.rowCount) return {
            ...acceptedSuccessCode,
            data: response.rows
        };

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};  

module.exports = {
    fetchGroupsModel
};