const argon2 = require('argon2');

const {addUser,usersList,getUserById,userByUsername} = require('../../usecases/users');
const makeRegisterUser = require('./register');
const makeLoginUser = require('./login');
const makeUsersList = require('./usersList');
const makeGetUser = require('./getUser');
const {jwtSignToken,jwtVerifyToken} = require('../../jwtAuthorization');

const loginUser = makeLoginUser({userByUsername,argon2,jwtSignToken});
const registerUser = makeRegisterUser({addUser,jwtSignToken});
const getUsersList = makeUsersList({usersList,jwtVerifyToken});
const getUser =  makeGetUser({getUserById,jwtVerifyToken});

const userController = Object.freeze({
    loginUser,
    registerUser,
    getUser,
    getUsersList,
});


module.exports = userController;