const {
    findAllRoles, findAllUsersAccessRights, addAccessRight, editAccessRight, findAccessRightById,
    removeAccessRightById, addUserRole
} = require('../../usecases/accessRights')
const { jwtVerifyToken } = require('../../jwtAuthorization')


const makeGetAllRoles = require('./getAllRoles')
const makeGetAllUsersAccessRights = require('./getAllUsersAccessRights')
const makeCreateUserAccessRights = require('./addUserAccessRight')
const makeUpdateAccessRight = require('./updateAccessRight')
const makeGetUserAccessRightById = require('./getUserAccessRightById')
const makeDeleteAccessRightById = require('./deleteAccessRightById')
const makeCreateUserRole = require('./createUserRole')

const getAllRoles = makeGetAllRoles({ findAllRoles, jwtVerifyToken })
const getAllUsersAccessRights = makeGetAllUsersAccessRights({ findAllUsersAccessRights, jwtVerifyToken })
const createUserAccessRight = makeCreateUserAccessRights({ addAccessRight, jwtVerifyToken })
const updateAccessRight = makeUpdateAccessRight({ editAccessRight, jwtVerifyToken })
const getUserAccessRightById = makeGetUserAccessRightById({ findAccessRightById, jwtVerifyToken })
const deleteAccessRightById = makeDeleteAccessRightById({ removeAccessRightById, jwtVerifyToken })
const createUserRole = makeCreateUserRole({ addUserRole, jwtVerifyToken })

const accessRightsController = Object.freeze({
    getAllRoles, getAllUsersAccessRights, createUserAccessRight, updateAccessRight, getUserAccessRightById,
    deleteAccessRightById, createUserRole
})

module.exports = accessRightsController
