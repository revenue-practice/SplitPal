const { userSettlementModel } = require("../models/settlements.create.model");
const { errorResponse, internalServerErrorCode } = require("../utils/constants");
const { isValidString } = require("../utils/helper");

const userSettlements = async (req, res) => {
    const { payee_id: toUserId, payer_id: fromUserId, group_id: groupId, expense_id: expenseId } = req.params;
    const { amount } = req.body;

    if(!isValidString(toUserId) || !isValidString(fromUserId) || !isValidString(groupId) || !isValidString(expenseId) || !isValidString(amount))
        return res.status(403).json({ message: statusResponse[403] });
    try {
        const settlementResponse = await userSettlementModel(fromUserId, toUserId, groupId, expenseId, amount);
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