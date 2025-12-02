const DBTABLES = {
    users: 'USERS',
    auth: 'CREDENTIALS',
    groups: 'GROUPS',
};

const statusResponse = {
    403: 'Forbidden request'
};

const errorResponse = (res, response) => {
    res.status(response.code ?? 500).json({
            status: '',
            message: 'Internal Server Error'
        });
}

const internalServerErrorCode = { code: 500 };
const createRecordSuccessCode = { code: 201 };
const acceptedSuccessCode = { code: 200 };

module.exports = {
    DBTABLES,
    statusResponse,
    errorResponse,
    internalServerErrorCode,
    createRecordSuccessCode,
    acceptedSuccessCode
};