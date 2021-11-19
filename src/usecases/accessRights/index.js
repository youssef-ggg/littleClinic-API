const { accessRightsCollection } = require('../../dataAcces')

const makeAddUserRole = require('./addUserRole')
const makeAddAccessRight = require('./addAccessRight')
const makeFindAccessRight = require('./findAccessRight')

const addUserRole = makeAddUserRole({ accessRightsCollection })
const addAccessRight = makeAddAccessRight({ accessRightsCollection })
const findAccessRight = makeFindAccessRight({ accessRightsCollection })

const accessRightServices = Object.freeze({
    addUserRole, addAccessRight, findAccessRight
})

module.exports = accessRightServices

