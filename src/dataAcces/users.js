module.exports = function makeUsersCollection({makeDb,ObjectID})
{
    return Object.freeze({
        findAll,
        findByUserName,
        findById,
        findByOcupation,
        insert,
        remove,
        update
      });

    async function findAll()
    {
      try {
          
        const db = await makeDb();
        const result  = await db.collection('users').find({});
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
          id:id.toString(),
          ...found
        }));
      } catch (error) {
        return error;
      }
    }

    async function findByUserName({username}){
      try{
        const db = await makeDb();
        const result = await db.collection('users').find({username:username});
        const found = await result.toArray();
        if (found.length === 0 ){
          return null;
        }
        const {_id:id,...info} = found[0];
        return {id,...info} ;

      }
      catch(error){
        return error;
      }
    }

    async function findById({id:_id}){

      const db = await makeDb();
      const result = await db.collection('users').find({_id:ObjectID(_id)});
      const found = await result.toArray();   
      if(found.length === 0)
        return null;
      
      const {_id:id,...info} = found[0];
      return {id,...info};

    }

    async function findByOcupation(){
      
    }

    async function insert(userInfo){

      try{
        const db = await makeDb();
        const result = await db.collection('users').insertOne(userInfo);
        const insertedInfo = result.ops[0];
        const {_id,...insertedUser} = insertedInfo;
        return {id:_id.toString(),...insertedUser};
        
      }catch(error){
        return error;
      }
      
      
    }

    async function remove(userInfo){
      const {id} = userInfo;
        try{
            const db = await makeDb();
            const result =  await db.collection('users').deleteOne({_id:ObjectID(id)});

            return result;
        }catch(error){
            return error;
        }
    }

    async function update(userData){

      const {id,...setNewUser} = userData;
      try {
        const options =  {returnOriginal: false};
        const db = await makeDb();
        const result = await db.collection('users').findOneAndUpdate({_id:ObjectID(id)},
        {
          $set:{...setNewUser}
        },
        options
       );

       const {value} = result;
       const {_id,...rest} = value;
        return {id:_id.toString(),...rest};
      } catch (error) {
        //TODO: add error log
        return error;
      }

    }
}

