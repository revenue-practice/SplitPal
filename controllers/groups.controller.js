const { isValidString } = require('../utils/helper');
const { statusResponse, errorResponse } = require('../utils/constants');
const { createGroupModel } = require('../models/groups.create.model');
const { editGroupModel } = require('../models/groups.edit.model');
const { transferGroupOwnerShipModel } = require('../models/groups.transfer.model');
const { fetchAllUsersModel } = require('../models/groups.fetch.model');
const { addMemberToGroupModel } = require('../models/group_members.add.model');
const { response } = require('express');

const createGroup = async (req, res) => {
    const { name, description, owner_id } = req.body;
    if (!isValidString(owner_id)) return res.status(403).json({ message: statusResponse[403] });

    if (!(isValidString(name) && isValidString(description)))
        return res.status(400).json({ message: 'Name and Description must be valid' });

    try {
        const response = await createGroupModel(name, description, owner_id);
        if (response.code === 201) return res.status(response.code).json({
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

const addMemberToGroup = async (req, res) => {
    const { id: groupId, memberId } = req.params;
    if (!isValidString(groupId) || !isValidString(memberId)) return res.status(403).json({ message: statusResponse[403] });

    try {
        const response = await addMemberToGroupModel(groupId, memberId);
        if (response.code === 201) return res.status(response.code).json({
            status: 'Ok',
            message: 'Member added to group successfully'
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
    if(!isValidString(id)) return res.status(403).json({ message: 'Forbidden action' });

    const { name, description } = req.body;
    if(!(isValidString(name) && isValidString(description))) 
        return res.status(400).json({ message: 'Both Name and description cannot be invalid' });

    try {
        const response = await editGroupModel(id, name, description);
        if(response.code === 200) return res.status(response.code).json({
            status: 'Ok',
            message: 'Group details updated'
        });

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
}; 

const transferGroupOwnerShip = async (req, res) => {
    const { id, ownerId } = req.params;
    if(!isValidString(id) || !isValidString(ownerId)) return res.status(403).json({ message: 'Forbidden action' });
    try {
        const response = await transferGroupOwnerShipModel(id, ownerId);
        if(response.code === 200) return res.status(response.code).json({
            status: 'Ok',
            message: 'Group ownership transfered'
        });

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
}; 

const fetchAllUsers = async (req, res) => {
    const groupId = req.params.id;
    if(!isValidString(groupId)) return res.status(403).json({ message: statusResponse[403] });

    try { 
        const usersInformation = await fetchAllUsersModel(groupId);
        if(usersInformation.code === 200) return res.status(200).json(usersInformation.data);
        
        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
};

module.exports = {
    createGroup,
    addMemberToGroup,
    editGroup,
    transferGroupOwnerShip,
    fetchAllUsers
};