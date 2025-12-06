const bcrypt = require('bcrypt');
const { isExistingUserModel, createUserModel } = require('../models/auth.signup.model');
const { isValidString } = require('../utils/helper');
const { errorResponse } = require('../utils/constants');
const saltRounds = Number(process.env.SALT);

const userSignup = async (req, res) => {
    const { firstName: fName, lastName: lName, email, password } = req.body;
    if (!isValidString(email)) {
        return res.status(400).json({ message: `Email is required!` });
    }
    if (!isValidString(password)) {
        return res.status(400).json({ message: `Password is required!` });
    }
    if (!isValidString(fName) || !isValidString(lName)) {
        return res.status(400).json({ message: `First Name and Last Name both are required!` });
    }

    try {
        const doUserExists = await isExistingUserModel(email);
        if (doUserExists.isUser) return res.status(200).json({ message: `User already exists, kindly login` });

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const response = await createUserModel(email, hashedPassword, fName, lName);
        if (response.code === 201) {
            return res.status(response.code).json({
                status: 'OK',
                message: 'Account created'
            });
        }

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
};

module.exports = {
    userSignup
};