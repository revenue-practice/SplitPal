const { createExpenseModel, editExpenseModel } = require("../models/expenses.create.model");
const { statusResponse, errorResponse } = require("../utils/constants");
const { isValidString, isArray, isString, isValidInteger } = require("../utils/helper");

const createExpense = async (req, res) => {
    const { group_id: groupId, user_id: userId } = req.params;
    if(!isValidString(groupId) || !isValidString(userId)) return res.status(403).json({ message: statusResponse[403] });

    const { name, description, total_amount: totalAmount, members: memberParticipation } = req.body;
    if(!isValidString(name) || !isString(description)) return res.status(400).json({ message: 'Both name and description should be valid' });
    if(!isValidInteger(totalAmount)) return res.status(400).json({ message: 'Invalid amount, amount must be an integer' });
    if(!isArray(memberParticipation)) return res.status(400).json({ message: 'Invalid member split on expense' });

    try {
        const response = await createExpenseModel(groupId, userId, name, description, totalAmount, memberParticipation);
        if(response.code === 201) return res.status(response.code).json({ message: `Expense created successfully` });

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
};

const editExpense = async (req, res) => {
    const { group_id: groupId, user_id: userId, expense_id: expenseId } = req.params;
    if(!isValidString(groupId) || !isValidString(userId) || !isValidString(expenseId)) return res.status(403).json({ message: statusResponse[403] });

    const { name, description, total_amount: totalAmount, members: memberParticipation } = req.body;
    if(!isValidString(name) || !isValidString(description)) return res.status(400).json({ message: 'Both name and description should be valid' });
    if(!isValidInteger(totalAmount)) return res.status(400).json({ message: 'Invalid amount, amount must be an integer' });
    if(!isArray(memberParticipation)) return res.status(400).json({ message: 'Invalid member split on expense' });

    try {
        const response = await editExpenseModel(groupId, userId, expenseId, name, description, totalAmount, memberParticipation);
        if(response.code === 200) return res.status(response.code).json({ message: `Expense updated successfully` });

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
}

module.exports = {
    createExpense,
    editExpense
};