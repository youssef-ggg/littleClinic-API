
module.exports = function makeGetUserByID({usersCollection})
{
    return async function getUserById({id}){

        return await usersCollection.findById({id}); 

    }

}