const  {usersCollection} = require('../../dataAcces');

const makeAddUser = require('./addUser');
const makeEditUser = require('./editUser');
const {makeListUsers} = require('./listUsers');
const makeGetUserByID = require('./getUserById'); 
const makeUserByUsername = require('./userByUsername');
const makeRemoveUser = require('./removeUser');


const addUser = makeAddUser({usersCollection});
const editUser = makeEditUser({usersCollection});
const usersList = makeListUsers({usersCollection});
const getUserById = makeGetUserByID({usersCollection});
const userByUsername = makeUserByUsername({usersCollection});
const removeUser = makeRemoveUser({usersCollection});

const userServices = Object.freeze({
    addUser,
    editUser,
    usersList,
    getUserById,
    userByUsername,
    removeUser
});


module.exports = userServices;
