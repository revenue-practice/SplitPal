const express = require('express');
const { userSignup } = require('../controllers/auth.signup.controller');
const { userLogin } = require('../controllers/auth.login.controller');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;