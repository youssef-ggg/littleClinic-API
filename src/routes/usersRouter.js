module.exports = function makeUserRoutes({routes,makeCallBack,userController})
{
    
    const {
        loginUser,
        getUsersList,
        getUser,
        registerUser
    } = userController;

routes.post('/login',makeCallBack(loginUser));
routes.get('/users',makeCallBack(getUsersList));
routes.get('/users/:id',makeCallBack(getUser));
routes.post('/register',makeCallBack(registerUser));

return routes;

}
