const {makeUser} = require('../../models');

function makeAddUser({usersCollection}){

    return async function addUser(userInfo){
        
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
                hashedPassword : await user.getHashedPassword(),
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


module.exports = {
    makeAddUser
};