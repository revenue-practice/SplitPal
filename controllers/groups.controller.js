const { isValidString } = require('../utils/helper');
const { statusResponse } = require('../utils/constants');
const { createGroupModel } = require('../models/groups.create.model');

const createGroup = async (req, res) => {
    const { name, description, owner_id } = req.body;
    if (!isValidString(owner_id)) return res.status(403).send(statusResponse[403]);

    if (!(isValidString(name) && isValidString(description)))
        return res.status(400).send('Name and Description must be valid');

    try {
        const response = await createGroupModel(name, description, owner_id);
        if (response.code === 201) return res.status(code).json({
            status: 'Ok',
            message: 'Group created successfully'
        });

        res.status(response.code).json({
            status: '',
            message: 'Internal Server Error'
        });
    }
    catch (error) {
        res.status(response.code).json({
            status: '',
            message: error.message ?? 'Internal Server Error'
        });
    }
};

const editGroup = async (req, res) => {
    const id = req.params.id;
    if(!isValidString(id)) return res.status(403).send('Forbidden action');

    const { name, description } = req.body;
    if(!(isValidString(name) && isValidString(description))) 
        return res.status(400).send('Both Name and description cannot be invalid');

    try {

    }
    catch (error) {

    }
};  

module.exports = {
    createGroup,
    editGroup
};