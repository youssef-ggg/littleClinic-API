const { findAllRoles, findAllUsersAccessRights, addAccessRight } = require('../../usecases/accessRights')
const { jwtVerifyToken } = require('../../jwtAuthorization')


const makeGetAllRoles = require('./getAllRoles')
const makeGetAllUsersAccessRights = require('./getAllUsersAccessRights')
const makeCreateUserAccessRights = require('./addUserAccessRight')

const getAllRoles = makeGetAllRoles({ findAllRoles, jwtVerifyToken })
const getAllUsersAccessRights = makeGetAllUsersAccessRights({ findAllUsersAccessRights, jwtVerifyToken })
const createUserAccessRight = makeCreateUserAccessRights({ addAccessRight, jwtVerifyToken })

const accessRightsController = Object.freeze({
    getAllRoles, getAllUsersAccessRights, createUserAccessRight
})

module.exports = accessRightsController
