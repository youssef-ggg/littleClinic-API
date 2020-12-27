function makeListUsers({usersCollection}){

    return async function usersList(){
        return await usersCollection.findAll();
    }
}

module.exports ={
    makeListUsers
}