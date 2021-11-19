module.exports = function buildMakeUserRole() {

    return function makeUserRole(
        {
            id,
            role,
            createdOn = Date.now(),
            modifiedOn = Date.now()
        } = {}
    ) {
        if (!role) {
            throw new Error('user role must have a role title')
        }

        return Object.freeze({
            getId: () => id,
            getrole: () => role,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn,
        })
    }
}