const bcrypt = require('bcrypt');
const { createUser, isExistingUser } = require('../models/auth.signup.model');
const { isValidString } = require('../utils/helper');
const saltRounds = Number(process.env.SALT);

const userSignup = async (req, res) => {
    const { firstName: fName, lastName: lName, email, password } = req.body;
    if (!isValidString(email)) {
        return res.status(400).send(`Email is required!`);
    }
    if (!isValidString(password)) {
        return res.status(400).send(`Password is required!`);
    }
    if (!isValidString(fName) || !isValidString(lName)) {
        return res.status(400).send(`First Name and Last Name both are required!`);
    }

    try {
        const doUserExists = await isExistingUser(email);
        if (doUserExists.isUser) return res.status(200).send(`User already exists, kindly login`);

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const response = await createUser(email, hashedPassword, fName, lName);
        if (response.code === 201) {
            return res.status(201).json({
                code: 201,
                status: 'OK',
                message: 'Account created'
            });
        }

        res.status(500).json({
            code: 500,
            status: '',
            message: 'Internal Server Error'
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            status: '',
            message: error.message ?? 'Internal Server Error'
        });
    }
};

module.exports = {
    userSignup
};