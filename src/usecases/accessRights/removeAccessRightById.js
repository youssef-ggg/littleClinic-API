module.exports = function makeRemoveAccessRightById({ accessRightsCollection }) {

    return async function removeAccessRightById(accessRightInfo) {

        return await accessRightsCollection.removeAccessRightById(accessRightInfo)
    }
}
