const { DBTABLES, createRecordSuccessCode, internalServerErrorCode } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const transferGroupOwnerShipModel = async (id, ownerId) => {
    const transferQuery = `UPDATE ${DBTABLES.groups} SET owner_id = $1 WHERE id = $2`;
    const groupMemberInactiveQuery = `UPDATE ${DBTABLES.groupMembers} SET is_active = false WHERE user_id = $1 and group_id = $2`;
    try {
        const response = await Promise.all([executeAsyncQueryWithoutLock(transferQuery, [ownerId, id]), executeAsyncQueryWithoutLock(groupMemberInactiveQuery, [ownerId, id])]);
        if (response.length === 2 && resresponseult[0].rowCount && response[1].rowCount) return acceptedSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    transferGroupOwnerShipModel
}