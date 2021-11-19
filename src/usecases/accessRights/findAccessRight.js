
module.exports = function makeFindAccessRight({ accessRightsCollection }) {
    
    return function findAccessRight({ module, userRole }) {
        return accessRightsCollection.checkAccessRight({ module, userRole })
    }
}