const express = require('express');
const { allowUserForAction } = require('../utils/helper');
const { userSettlements } = require('../controllers/settlements.controller');
const router = express.Router();

router.use(allowUserForAction);
router.post('/create/:payee_id/:payer_id/:group_id', userSettlements);

module.exports = router;