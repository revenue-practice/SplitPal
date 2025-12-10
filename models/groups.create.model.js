const { DBTABLES, noDataReturnedErrorCode, createRecordSuccessCode } = require('../utils/constants');
const { executeAsyncQueryWithoutLock } = require('../utils/helper');
const { v4: uuidv4 } = require('uuid');

const createGroupModel = async (name, description, ownerId, members) => {
    const groupId = uuidv4(), currentTime = new Date().toISOString();
    let groupMemberId = uuidv4();

    try {
        const groupQuery = `INSERT INTO ${DBTABLES.groups} VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const groupQueryParams = [groupId, name, description, ownerId, true, currentTime, currentTime];

        const groupMembersQuery = `INSERT INTO ${DBTABLES.groupMembers} VALUES ($1, $2, $3, $4, $5, $6)`;
        let groupMembersQueryParams = [groupMemberId, ownerId, groupId, true, currentTime, currentTime];

        const groupResponse = await executeAsyncQueryWithoutLock(groupQuery, groupQueryParams);
        const groupOwnerResponse = await executeAsyncQueryWithoutLock(groupMembersQuery, groupMembersQueryParams);

        let result = 0;
        for(let id of members) {
            groupMemberId = uuidv4(), groupMembersQueryParams[0] = groupMemberId, groupMembersQueryParams[1] = id;

            const groupMemberResponse = await executeAsyncQueryWithoutLock(groupMembersQuery, groupMembersQueryParams);
            if(groupMemberResponse.rowCount) result += 1;
        }

        if (result === members.length && groupResponse.rowCount && groupOwnerResponse.rowCount) return createRecordSuccessCode;

        return noDataReturnedErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createGroupModel
};