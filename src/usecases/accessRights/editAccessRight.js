const { makeAccessRight } = require('../../models')

module.exports = function MakeEditAccessRight({ accessRightsCollection }) {

    return async function editAccessRight(updatedAccessRight) {

        const existing = await accessRightsCollection.findAccessRightById({ id: updatedAccessRight.id })
        if (!existing) {
            throw new RangeError('Access Rights not found.')
        }

        const accessRight = makeAccessRight(updatedAccessRight)

        return await accessRightsCollection.updateAccessRight({
            id: accessRight.getId(),
            module: accessRight.getModule(),
            userRole: accessRight.getUserRole(),
            read: accessRight.getRead(),
            create: accessRight.getCreate(),
            write: accessRight.getWrite(),
            remove: accessRight.getRemove(),
            modifiedOn: accessRight.getModifiedOn(),
        })

    }
}