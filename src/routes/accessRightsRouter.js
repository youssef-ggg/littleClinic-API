module.exports = function makeAccessRightsRouter({ routes, makeCallBack, accessRightsController }) {

    const {
        createUserAccessRight,
        getAllRoles,
        getAllUsersAccessRights
    } = accessRightsController

    routes.post('/access/addRole',makeCallBack(createUserAccessRight));
    routes.get('/access/roles', makeCallBack(getAllRoles))
    routes.get('/access/usersRights', makeCallBack(getAllUsersAccessRights))
    return routes
}