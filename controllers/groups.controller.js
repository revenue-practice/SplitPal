const { isValidString } = require('../utils/helper');
const { statusResponse, errorResponse } = require('../utils/constants');
const { createGroupModel } = require('../models/groups.create.model');
const { editGroupModel } = require('../models/groups.edit.model');
const { transferGroupOwnerShipModel } = require('../models/groups.transfer.model');

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
        res.status(500).json({
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
        const response = await editGroupModel(id, name, description);
        if(response.code === 200) return res.status(response.code).json({
            status: 'Ok',
            message: 'Group details updated'
        });

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res);
    }
}; 

const transferGroupOwnerShip = async (req, res) => {
    const { id, ownerId } = req.params;
    if(!isValidString(id) || !isValidString(ownerId)) return res.status(403).send('Forbidden action');
    try {
        const response = await transferGroupOwnerShipModel(id, ownerId);
        if(response.code === 200) return res.status(response.code).json({
            status: 'Ok',
            message: 'Group ownership transfered'
        });

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res);
    }
}; 

module.exports = {
    createGroup,
    editGroup,
    transferGroupOwnerShip
};