const { userSettlementModel } = require("../models/settlements.create.model");
const { errorResponse, internalServerErrorCode } = require("../utils/constants");
const { isValidString, isArray } = require("../utils/helper");

const userSettlements = async (req, res) => {
    const { payee_id: toUserId, payer_id: fromUserId, group_id: groupId } = req.params;
    const { settlements } = req.body;

    if(!isValidString(toUserId) || !isValidString(fromUserId) || !isValidString(groupId))
        return res.status(403).json({ message: statusResponse[403] });

    if(!isArray(settlements)) return res.status(400).json({ message: "Atleast one expense must be selected" });

    try {
        const settlementResponse = await userSettlementModel(fromUserId, toUserId, groupId, settlements);
        if(settlementResponse.code === 201) return {
            status: 'Ok',
            message: 'Settlement record created'
        };

        return internalServerErrorCode;
    }
    catch (error) {
        errorResponse(error);
    }
};

module.exports = {
    userSettlements
};