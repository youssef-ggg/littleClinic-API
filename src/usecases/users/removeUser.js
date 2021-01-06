module.exports = function makeRemoveUser({usersCollection})
{
    return async function removeUser({id})
    {
        return await usersCollection.remove({id});
    }
}