module.exports = function makeUserRoutes({routes,makeCallBack,userController})
{
    
    const {
        loginUser,
        getUsersList,
        getUser,
        registerUser,
        registerFirstUser,
        createUser,
        updateUser,
        updateUserPass,
        deleteUser,
        getUserByUsername
    } = userController;

    routes.post('/users/login',makeCallBack(loginUser));
    routes.get('/users/listAll',makeCallBack(getUsersList));
    routes.get('/users/:id',makeCallBack(getUser));
    routes.get('/users/user/:username',makeCallBack(getUserByUsername));
    routes.post('/users/register',makeCallBack(registerUser));
    routes.post('/users/register/first',makeCallBack(registerFirstUser));
    routes.post('/users/add',makeCallBack(createUser));
    routes.patch('/users/edit/:id',makeCallBack(updateUser));
    routes.patch('/users/editPassword/:id',makeCallBack(updateUserPass));
    routes.delete('/users/delete/:id',makeCallBack(deleteUser));

    return routes;

}
