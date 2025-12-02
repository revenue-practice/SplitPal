const express = require('express');
const allowUserForAction = require('../utils/helper');
const { createExpense, editExpense } = require('../controllers/expenses.controller');
const router = express.Router();

router.use(allowUserForAction);
router.post('/create/:group/:user', createExpense);
router.put('/edit/:group/:user', editExpense);

module.exports = router;