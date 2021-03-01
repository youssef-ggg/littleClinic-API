const {makeUser} = require('../../models');

module.exports = function makeEditUser({usersCollection}){

    return async function editUser({id,...userChanges})
    {
        const usernameRegex = /^[a-zA-Z0-9.-_]*$/;
        const nameRegex = /^[a-zA-Z .']*$/;
        
        if(!id) {
            throw new Error('You must supply an id.');
        }
        //investigate later
        if(Object.keys(userChanges).length == 0){
            throw new Error('No changes to update.');
        }
   
        if(userChanges.username == null || userChanges.username == ''){
            throw new Error('user must have a username.');
        }
        else if(userChanges.username.length < 3){
            throw new Error('username must be at least three characters.');
        }
        else if(!usernameRegex.test(userChanges.username)){
            throw new Error('username must not contain invalid characters.');
        }

      
        if(userChanges.name == null || userChanges.name == '')
            throw new Error('Empty name supplied.')
        if(userChanges.name.length<3){
            throw new Error('name must be at least three characters.');
        }
        else if(!nameRegex.test(userChanges.name)){
            throw new Error('name must not contain invalid characters.');
        }
    
    
        if(userChanges.accessRights == null || userChanges.accessRights.length == 0)
        {

            throw new Error('Empty access rights supplied.');
            
        }
        
        const existing = await usersCollection.findById({id});
       
        if(!existing){
            throw new Error('user dosen\'t exist.');
        }

        const updatedUser = makeUser({id,...userChanges});
        
        return await usersCollection.update({
            id:updatedUser.getId(),
            username:updatedUser.getUserName(),
            name:updatedUser.getName(),
            occupation:updatedUser.getOccupation(),
            modifiedOn:updatedUser.getModifiedOn(),
            accessRights:updatedUser.getAccessRights()
        });
    }
}