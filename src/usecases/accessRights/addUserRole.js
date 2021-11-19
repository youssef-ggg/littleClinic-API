const { makeUserRole } = require('../../models')

module.exports = function makeAddUserRole({ accessRightsCollection }) {

    return function addUserRole(userRoleData) {

        const userRole = makeUserRole(userRoleData)

        return accessRightsCollection.insertUserRole({
            role: userRole.getrole(),
            createdOn: userRole.getCreatedOn(),
            modifiedOn: userRole.getModifiedOn(),
        })
    }
}