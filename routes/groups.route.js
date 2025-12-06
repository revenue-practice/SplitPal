const express = require('express');
const router = express.Router();

const { allowUserForAction } = require('../utils/helper');
const { createGroup, addMemberToGroup, editGroup, transferGroupOwnerShip, fetchAllUsersPerGroup } = require('../controllers/groups.controller');

router.use(allowUserForAction);
router.post('/create', createGroup);
router.post('/addMember/:id/:memberId', addMemberToGroup);
router.put('/edit/:id', editGroup);
router.put('/transfer/:id/:ownerId', transferGroupOwnerShip);
// router.get('/fetchAll:/id', fetchAllUsersPerGroup);

module.exports = router;
