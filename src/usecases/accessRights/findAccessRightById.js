module.exports = function makeFindAccessRight({ accessRightsCollection }) {

    return async function findAccessRight({ id }) {

        return await accessRightsCollection.findAccessRightById({ id })
    }
}