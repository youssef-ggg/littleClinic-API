const { makeAccessRight } = require('../../models')

module.exports = function makeAddAccessRight({ accessRightsCollection }) {

    return async function addAccessRight(AccessRigtData) {

        const accessRight = makeAccessRight(AccessRigtData)

        const roleExists = await accessRightsCollection.findUserRole({ role: accessRight.getUserRole() })
        const accessRightExists = await accessRightsCollection.checkAccessRight({
            module:accessRight.getModule(),
            userRole:accessRight.getUserRole()
        })
        if(accessRightExists){
            throw new Error('this access Right already exists')
        }
        if (roleExists) {
            return accessRightsCollection.insert({
                module: accessRight.getModule(),
                userRole:accessRight.getUserRole(),
                read: accessRight.getRead(),
                create: accessRight.getCreate(),
                write: accessRight.getWrite(),
                remove: accessRight.getRemove(),
                createdOn: accessRight.getCreatedOn(),
                modifiedOn: accessRight.getModifiedOn(),
            })
        } else {
            throw new Error('User role inserted dosen\'t exists')
        }

    }
}