const express = require('express');
const router = express.Router();

const { allowUserForAction } = require('../utils/helper');
const { createGroup, editGroup } = require('../controllers/groups.controller');

router.use(allowUserForAction);
router.use('/create', createGroup);
router.use('/edit/:id', editGroup);

module.exports = router;
