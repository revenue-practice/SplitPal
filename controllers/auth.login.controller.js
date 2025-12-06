const { isExistingUserModel } = require('../models/auth.signup.model');
const { isUserAuthenticated, isValidString } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { errorResponse } = require('../utils/constants');

const authSecret = process.env.JWT_SECRET;

const userLogin = async (req, res) => {
    if (isUserAuthenticated(req)) return res.status(200).json({
        status: 'OK',
        message: 'Token not expired'
    });

    const { email, password } = req.body;
    if (!isValidString(email) || !isValidString(password)) return res.status(400).json({ message: `Email and password should be valid` });

    try {
        const doUserExists = await isExistingUserModel(email);
        if (!doUserExists.isUser) return res.status(404).json({ message: 'User not found' });
            
        const doPasswordsMatch = await bcrypt.compare(password, doUserExists.data?.hashed_password);
        if(!doPasswordsMatch) return res.status(403).json({ message: 'Password is incorrect' });

        const payload = {
            id: doUserExists.data.id,
            email: email
        };

        const token = jwt.sign(payload, authSecret, { expiresIn: "7d" });
        res.cookie('Authorisation', `Bearer ${token}`, { httpOnly: true, sameSite: 'lax' });

        return res.status(doUserExists?.code).json({
            status: 'OK',
            message: 'Logged in successfully'
        });
    }
    catch (error) {
        errorResponse(res, null, error);
    }
};

module.exports = {
    userLogin
};