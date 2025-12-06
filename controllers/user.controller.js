const { fetchGroupsModel } = require("../models/user.fetch.model");
const { errorResponse } = require("../utils/constants");

const fetchGroups = async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await fetchGroupsModel(userId);
        if(response.code === 200) return res.status(response.code).json(response.data);

        errorResponse(res, response);
    }
    catch (error) {
        errorResponse(res, null, error);
    }
};

module.exports = {
    fetchGroups
};