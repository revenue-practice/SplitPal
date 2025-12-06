const { DBTABLES, internalServerErrorCode, acceptedSuccessCode } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const fetchAllUsersModel = async (groupId) => {
    const getUsersQuery = `SELECT id, user_id FROM ${DBTABLES.groupMembers} WHERE group_id = $1 and is_active = True LIMIT 100`;
    try {
        const fetchUserIdsResponse = await executeAsyncQueryWithoutLock(getUsersQuery, [groupId]);
        if(fetchUserIdsResponse.rowCount) {
            let baseUserDetailsQuery = `SELECT fname, lname, email FROM ${DBTABLES.users} WHERE id in (`;
            let paramsCount = 1, userDetailQueryParams = [];
            for (let user of fetchUserIdsResponse.rows) {
                const { user_id: userId } = user;
                baseUserDetailsQuery += `$${paramsCount}, `;
                userDetailQueryParams.push(userId); paramsCount += 1;
            }
            baseUserDetailsQuery.slice(0, -2); 
            let userDetailQuery = baseUserDetailsQuery.slice(0, -2); userDetailQuery += `) LIMIT 100`;
            const response = await executeAsyncQueryWithoutLock(userDetailQuery, userDetailQueryParams);

            if(response.rowCount) return {
                ...acceptedSuccessCode,
                data: response.rows
            }
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