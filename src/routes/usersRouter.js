module.exports = function makeUserRoutes({routes,makeCallBack,userController})
{
    
    const {
        loginUser,
        getUsersList,
        getUser,
        registerUser,
        createUser,
        updateUser,
        deleteUser,
        getUserByUsername
    } = userController;

routes.post('/login',makeCallBack(loginUser));
routes.get('/listAll',makeCallBack(getUsersList));
routes.get('/:id',makeCallBack(getUser));
routes.get('/user/:username',makeCallBack(getUserByUsername));
routes.post('/register',makeCallBack(registerUser));
routes.post('/add',makeCallBack(createUser));
routes.patch('/edit/:id',makeCallBack(updateUser))
routes.delete('/delete/:id',makeCallBack(deleteUser));

return routes;

}
