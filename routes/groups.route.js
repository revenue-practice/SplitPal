const express = require('express');
const router = express.Router();

const { allowUserForAction } = require('../utils/helper');
const { createGroup, editGroup, transferGroupOwnerShip } = require('../controllers/groups.controller');

router.use(allowUserForAction);
router.post('/create', createGroup);
router.put('/edit/:id', editGroup);
router.put('/transfer/:id/:ownerId', transferGroupOwnerShip);
// router.get('/fetchAll');

module.exports = router;
