const {makeUser} = require('../../models');
const user = require('../../__test__/fixtures/user');

module.exports = function makeEditUserPassword({usersCollection,argon2}){

    return async function editUserPassword(userChanges){

        const {id,oldPassword,password} = userChanges;
        
        if (oldPassword == null || oldPassword == undefined)
        {
            throw new Error('old password can\'t be null or undefined.');
        }
        if(oldPassword === ''){
            throw new Error('Invalid old password.')
        }
        if(password == null || password == undefined){
            throw new Error('new password can\'t be null or undefined.');
        }
        else if(password.length < 8){
            throw new Error('new password can\'t be less then eight characters.')
        }

        const exists = await usersCollection.findById({id}); 
        const oldMatchNew = await argon2.verify(exists.hashedPassword,password);
        const passMatch = await argon2.verify(exists.hashedPassword,oldPassword);
        if(!passMatch){
            throw new Error('old password is invalid.')
        }
        if(oldMatchNew){
            throw new Error('new password can\'t match the old password.');
        }
        
        
        userChanges.hashedPassword = await argon2.hash(userChanges.password);
        const updatedUser = makeUser(userChanges);
        
        return await usersCollection.update({
            id:updatedUser.getId(),
            hashedPassword:updatedUser.getHashedPassword(),//Changed dependancy enjection to here
        });
    }

}