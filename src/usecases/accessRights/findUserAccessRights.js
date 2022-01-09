const { makeAccessRight } = require('../../models')

module.exports = function makeFindUserAccessRight({ accessRightsCollection, modules }) {

    return async function findUserAccessRights({ userRole }) {

        let userAccessRights = await accessRightsCollection.findByUserRole({ userRole })
        const userAccessModules = {}

        if (userAccessRights == null) {
            userAccessRights = []
        }

        userAccessRights.forEach(access => {
            const { module, userRole, ...data } = access
            userAccessModules[access.module] = { ...data }
        })

        modules.forEach(module => {
            if (!userAccessModules[module]) {
                const accessRight = makeAccessRight({
                    id: 0,
                    module,
                    userRole
                })
                userAccessModules[module] = {
                    id: accessRight.getId(),
                    module: accessRight.getModule(),
                    userRole: accessRight.getUserRole(),
                    read: accessRight.getRead(),
                    create: accessRight.getCreate(),
                    write: accessRight.getWrite(),
                    remove: accessRight.getRemove(),
                    createdOn: accessRight.getCreatedOn(),
                    modifiedOn: accessRight.getModifiedOn(),
                }
            }
        })

        return userAccessModules

    }
}