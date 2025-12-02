const { DBTABLES } = require('../utils/constants');
const { executeAsyncQueryWithoutLock } = require('../utils/helper');

const createGroupModel = async (name, description, owner_id) => {
    const id = uuidv4(), currentTime = new Date().toISOString();
    try {
        const query = `INSERT INTO ${DBTABLES.groups} VALUES ($1, $2, $3, $4, $5, $6, a$7)`;
        const queryParams = [id, name, description, owner_id, true, currentTime, currentTime];

        const response = await executeAsyncQueryWithoutLock(query, queryParams);
        if(response.length && response[0].rowCount) return { code: 201 };

        return { code: 500 };
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createGroupModel
};