module.exports = function makeAccessRightsRouter({ routes, makeCallBack, accessRightsController }) {

    const {
        createUserAccessRight,
        getAllRoles,
        getAllUsersAccessRights,
        updateAccessRight,
        getUserAccessRightById,
        deleteAccessRightById
    } = accessRightsController

    routes.post('/access/addRole', makeCallBack(createUserAccessRight))
    routes.get('/access/roles', makeCallBack(getAllRoles))
    routes.get('/access/usersRights', makeCallBack(getAllUsersAccessRights))
    routes.patch('/access/updateRole/:id', makeCallBack(updateAccessRight))
    routes.get('/access/usersRight/:id', makeCallBack(getUserAccessRightById))
    routes.delete('/access/removeRight/:id', makeCallBack(deleteAccessRightById))

    return routes
}