const {makeUser} = require('../../models');

module.exports = function makeAddUser({usersCollection}){

    return async function addUser(userInfo){
        
        const {username,name} = userInfo;
        const usernameRegex = /^[a-zA-Z0-9.-_]*$/;
        const nameRegex = /^[a-zA-Z ]*$/;
        
        if(!username){
            throw new Error('user must have a username.');
        }
        else if(username.length < 3){
            throw new Error('username must be at least three characters.');
        }
        else if(!usernameRegex.test(username)){
            throw new Error('username must not contain invalid characters.');
        }

        if(!name){
            throw new Error('user must have a name.');
        }
        else if(name.length<3){
            throw new Error('name must be at least three characters.');
        }
        else if(!nameRegex.test(name)){
            throw new Error('name must not contain invalid characters.');
        }

        try {
            const user = makeUser(userInfo);
            const exists = await usersCollection.findByUserName({username:user.getUserName()});
            if (exists)
            {
                return {
                    statusCode:409,
                    errorMessage:'This user Already Exists',
                }
            }
            
            return usersCollection.insert({
                username : user.getUserName(),
                hashedPassword : await user.getHashedPassword(),//Change dependancy enjection to here
                name : user.getName(),
                occupation:user.getOccupation(),
                createdOn : user.getCreateOn(),
                modifiedOn : user.getModifiedOn(),
                accessRights : user.getAccessRights(),
            });
        }
        catch(error){
            return error;
        }
    }
}
