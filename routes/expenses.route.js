const express = require('express');
const router = express.Router();

const { allowUserForAction } = require('../utils/helper');
const { createExpense, editExpense } = require('../controllers/expenses.controller');

router.use(allowUserForAction);
router.post('/create/:group_id/:user_id', createExpense);
router.put('/edit/:group_id/:user_id/:expense_id', editExpense);

module.exports = router;