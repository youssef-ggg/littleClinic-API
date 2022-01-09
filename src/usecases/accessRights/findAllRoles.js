module.exports = function makeFindAllRoles({ accessRightsCollection }){

    return function findAllRoles(){
        return accessRightsCollection.findAllRoles()
    }
}