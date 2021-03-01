const argon2 = require('argon2');
const  {usersCollection} = require('../../dataAcces');

const makeAddUser = require('./addUser');
const makeEditUser = require('./editUser');
const makeEditUserPassword = require('./editUserPassword');
const {makeListUsers} = require('./listUsers');
const makeGetUserByID = require('./getUserById'); 
const makeUserByUsername = require('./userByUsername');
const makeRemoveUser = require('./removeUser');


const addUser = makeAddUser({usersCollection,argon2});
const editUser = makeEditUser({usersCollection});
const editUserPassword = makeEditUserPassword({usersCollection,argon2});
const usersList = makeListUsers({usersCollection});
const getUserById = makeGetUserByID({usersCollection});
const userByUsername = makeUserByUsername({usersCollection});
const removeUser = makeRemoveUser({usersCollection});

const userServices = Object.freeze({
    addUser,
    editUser,
    editUserPassword,
    usersList,
    getUserById,
    userByUsername,
    removeUser
});


module.exports = userServices;
