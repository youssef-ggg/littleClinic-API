const { makeAccessRight } = require('../../models')

module.exports = function makeFindAllUsersAccessRights({ accessRightsCollection }) {

    return async function findAllUsersAccessRights() {

        let accessRights = await accessRightsCollection.findAllAccessRights()

        const usersAccessModules = {}

        accessRights.forEach(accessRightDb => {

            const accessRight = makeAccessRight(accessRightDb)
            const userRole = accessRight.getUserRole()

            if (!usersAccessModules[userRole]) {
                usersAccessModules[userRole] = []
            }
            usersAccessModules[userRole].push({
                id: accessRight.getId(),
                module: accessRight.getModule(),
                userRole: accessRight.getUserRole(),
                read: accessRight.getRead(),
                create: accessRight.getCreate(),
                write: accessRight.getWrite(),
                remove: accessRight.getRemove(),
                createdOn: accessRight.getCreatedOn(),
                modifiedOn: accessRight.getModifiedOn(),
            })

        })
        return usersAccessModules

    }
}