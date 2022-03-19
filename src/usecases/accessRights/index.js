const { accessRightsCollection } = require('../../dataAcces')
const { modules } = require('../../utils/modules')

const makeAddUserRole = require('./addUserRole')
const makeAddAccessRight = require('./addAccessRight')
const makeFindAccessRight = require('./findAccessRight')
const makeFindUserAccessRight = require('./findUserAccessRights')
const makeFindAllUsersAccessRights = require('./findAllUsersAccessRights')
const makeFindAllRoles = require('./findAllRoles')
const makeEditAccessRight = require('./editAccessRight')
const makeFindAccessRightById = require('./findAccessRightById')
const makeRemoveAccessRightById = require('./removeAccessRightById')

const addUserRole = makeAddUserRole({ accessRightsCollection })
const addAccessRight = makeAddAccessRight({ accessRightsCollection })
const findAccessRight = makeFindAccessRight({ accessRightsCollection })
const findUserAccessRights = makeFindUserAccessRight({ accessRightsCollection, modules })
const findAllUsersAccessRights = makeFindAllUsersAccessRights({ accessRightsCollection })
const findAllRoles = makeFindAllRoles({ accessRightsCollection })
const editAccessRight = makeEditAccessRight({ accessRightsCollection })
const findAccessRightById = makeFindAccessRightById({ accessRightsCollection })
const removeAccessRightById = makeRemoveAccessRightById({ accessRightsCollection })

const accessRightServices = Object.freeze({
    addUserRole, addAccessRight, findAccessRight, findUserAccessRights, findAllUsersAccessRights,
    findAllRoles, editAccessRight, findAccessRightById, removeAccessRightById
})

module.exports = accessRightServices

