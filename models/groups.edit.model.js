const { DBTABLES, internalServerErrorCode, acceptedSuccessCode } = require("../utils/constants");
const { isValidString, executeAsyncQueryWithoutLock } = require("../utils/helper");

const editGroupModel = async (id, name, description) => {
    let baseQuery = `UPDATE ${DBTABLES.groups} SET `;
    let queryParams = [];
    if(isValidString(name)) {
        baseQuery += `name = $${queryParams.length + 1}`;
        queryParams.push(name);
    }
    if(isValidString(description)) {
        if(queryParams.length) baseQuery += `, description = $${queryParams.length + 1} `;
        else baseQuery += `description = $${queryParams.length + 1} `;
        queryParams.push(description);
    }

    baseQuery += `WHERE id = $${queryParams.length + 1}`;
    queryParams.push(id);

    try {
        const response = await executeAsyncQueryWithoutLock(baseQuery, queryParams);
    
        if(!response.rowCount) return { message: 'Wrong query for update' };
        if(response.rowCount) return acceptedSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    editGroupModel
};