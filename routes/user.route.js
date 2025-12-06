const express = require('express');
const { allowUserForAction } = require('../utils/helper');
const { fetchGroups } = require('../controllers/user.controller');
const router = express.Router();

router.use(allowUserForAction);
router.get('/fetchGroups/:id', fetchGroups);

module.exports = router;