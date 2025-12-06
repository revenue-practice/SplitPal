const { DBTABLES, internalServerErrorCode, acceptedSuccessCode } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");
const { fetchGroupUserDetailsModel } = require("./group_members.fetch.model");

const transferGroupOwnerShipModel = async (id, ownerId) => {
    try {
        const isNewOwnerInGroup = await fetchGroupUserDetailsModel(ownerId, id);
        if(isNewOwnerInGroup.code === 400) return isNewOwnerInGroup;

        const transferQuery = `UPDATE ${DBTABLES.groups} SET owner_id = $1, updated_at = $2 WHERE id = $3`;
        const currentTime = new Date().toISOString();
        try {
            const response = await executeAsyncQueryWithoutLock(transferQuery, [ownerId, currentTime, id]);
            if (response.rowCount) return acceptedSuccessCode;

            return internalServerErrorCode;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    transferGroupOwnerShipModel
}