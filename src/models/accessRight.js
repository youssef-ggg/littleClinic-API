module.exports = function buildMakeAccessRight() {

    return function makeAccessRight(
        {
            id,
            module,
            userRole,
            read = false,
            create = false,
            write = false,
            remove = false,
            createdOn = Date.now(),
            modifiedOn = Date.now()
        } = {}
    ) {

        if (!module) {
            throw new Error('must have a module')
        }
        if (!userRole) {
            throw new Error('must have a user')
        }

        return Object.freeze({
            getId: () => id,
            getModule:()=>module,
            getUserRole:()=>userRole,
            getRead: () => read,
            getCreate: () => create,
            getWrite: () => write,
            getRemove: () => remove,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn,
        })
    }
}