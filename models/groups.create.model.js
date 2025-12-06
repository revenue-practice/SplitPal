const { DBTABLES, internalServerErrorCode, createRecordSuccessCode } = require('../utils/constants');
const { executeAsyncQueryWithoutLock } = require('../utils/helper');
const { v4: uuidv4 } = require('uuid');

const createGroupModel = async (name, description, owner_id) => {
    const groupId = uuidv4(), groupMemberId = uuidv4(), currentTime = new Date().toISOString();
    try {
        const groupQuery = `INSERT INTO ${DBTABLES.groups} VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const groupQueryParams = [groupId, name, description, owner_id, true, currentTime, currentTime];

        const groupMembersQuery = `INSERT INTO ${DBTABLES.groupMembers} VALUES ($1, $2, $3, $4, $5, $6)`;
        const groupMembersQueryParams = [groupMemberId, owner_id, groupId, true, currentTime, currentTime];

        const groupResponse = await executeAsyncQueryWithoutLock(groupQuery, groupQueryParams);
        const groupMemberResponse = await executeAsyncQueryWithoutLock(groupMembersQuery, groupMembersQueryParams);
        const response = [groupResponse, groupMemberResponse];
        if (response.length === 2 && response[0].rowCount && response[1].rowCount) return createRecordSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createGroupModel
};