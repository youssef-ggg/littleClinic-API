const {
    findAllRoles, findAllUsersAccessRights, addAccessRight, editAccessRight, findAccessRightById,
    removeAccessRightById
} = require('../../usecases/accessRights')
const { jwtVerifyToken } = require('../../jwtAuthorization')


const makeGetAllRoles = require('./getAllRoles')
const makeGetAllUsersAccessRights = require('./getAllUsersAccessRights')
const makeCreateUserAccessRights = require('./addUserAccessRight')
const makeUpdateAccessRight = require('./updateAccessRight')
const makeGetUserAccessRightById = require('./getUserAccessRightById')
const makeDeleteAccessRightById = require('./deleteAccessRightById')

const getAllRoles = makeGetAllRoles({ findAllRoles, jwtVerifyToken })
const getAllUsersAccessRights = makeGetAllUsersAccessRights({ findAllUsersAccessRights, jwtVerifyToken })
const createUserAccessRight = makeCreateUserAccessRights({ addAccessRight, jwtVerifyToken })
const updateAccessRight = makeUpdateAccessRight({ editAccessRight, jwtVerifyToken })
const getUserAccessRightById = makeGetUserAccessRightById({ findAccessRightById, jwtVerifyToken })
const deleteAccessRightById = makeDeleteAccessRightById({ removeAccessRightById, jwtVerifyToken })

const accessRightsController = Object.freeze({
    getAllRoles, getAllUsersAccessRights, createUserAccessRight, updateAccessRight, getUserAccessRightById,
    deleteAccessRightById
})

module.exports = accessRightsController
