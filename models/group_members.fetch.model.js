const { DBTABLES } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const fetchGroupUserDetailsModel = async (userId, groupId) => {
    const query = `SELECT * FROM ${DBTABLES.groupMembers} WHERE group_id = $1 LIMIT 1000`;
    const queryParams = [groupId];
    try {
        const response = await executeAsyncQueryWithoutLock(query, queryParams);
        if(!response.rowCount) return { code: 400, message: 'User do not belong to the group' };

        let isUserInGroup = false;
        if(response.rowCount) {
            for(const row of response.rows) {
                const { user_id, is_active } = row;
                if(user_id === userId && is_active) isUserInGroup = true;
            }
        }

        if(!isUserInGroup) return { code: 400, message: `User not present in group` };
        return { code: 200, message: `User present in group` };
    }  
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    fetchGroupUserDetailsModel
};