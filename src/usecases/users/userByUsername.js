module.exports = function makeUserByUsername({usersCollection}){
    
    return async function userByUsername({username}){

        const userData = await usersCollection.findByUserName({username});
        return userData;

    }

}