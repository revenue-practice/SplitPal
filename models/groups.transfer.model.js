const { DBTABLES, createRecordSuccessCode, internalServerErrorCode } = require("../utils/constants");
const { executeAsyncQueryWithoutLock } = require("../utils/helper");

const transferGroupOwnerShipModel = async (id, ownerId) => {
    const query = `UPDATE ${DBTABLES.groups} SET owner_id = $1 WHERE id = $2`;
    try {
        const response = await executeAsyncQueryWithoutLock(query, [ownerId, id]);
        if(response.rowCount) return acceptedSuccessCode;

        return internalServerErrorCode;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    transferGroupOwnerShipModel
}