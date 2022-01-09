const argon2 = require('argon2');

const { addUser, editUser, usersList, getUserById, userByUsername,
    editUserPassword, removeUser } = require('../../usecases/users');

const {
    findUserAccessRights
} = require('../../usecases/accessRights')

const makeRegisterUser = require('./register');
const makeLoginUser = require('./login');
const makeUsersList = require('./usersList');
const makeGetUser = require('./getUser');
const makeCreateUser = require('./createUser');
const makeUpdateUser = require('./updateUser');
const makeUpdateUserPass = require('./updateUserPass');
const makeDeleteUser = require('./deleteUser');
const makeGetUserByUsername = require('./getUserByUsername');

const { jwtSignToken, jwtVerifyToken } = require('../../jwtAuthorization');

const loginUser = makeLoginUser({ userByUsername, argon2, jwtSignToken, findUserAccessRights });
const registerUser = makeRegisterUser({ addUser, jwtSignToken });
const getUsersList = makeUsersList({ usersList, jwtVerifyToken });
const getUser = makeGetUser({ getUserById, jwtVerifyToken });
const createUser = makeCreateUser({ addUser, jwtVerifyToken });
const updateUser = makeUpdateUser({ editUser, jwtVerifyToken });
const updateUserPass = makeUpdateUserPass({ editUserPassword, jwtVerifyToken });
const deleteUser = makeDeleteUser({ removeUser, jwtVerifyToken });
const getUserByUsername = makeGetUserByUsername({ userByUsername, jwtVerifyToken })

const userController = Object.freeze({
    loginUser,
    registerUser,
    getUser,
    getUsersList,
    createUser,
    updateUser,
    updateUserPass,
    deleteUser,
    getUserByUsername
});


module.exports = userController;