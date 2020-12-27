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

    async function findById({id}){

      try {
        const db = await makeDb();
        const result = await db.collection('users').find({_id:ObjectID(id)});
        const found = await result.toArray();   
        if(found.length === 0)
          return null;
        return {_id:id,...info}  = found[0];
      } 
      catch (error) {
        return error;
      }

    }

    async function findByOcupation(){
      
    }

    async function insert(userInfo){

      try{
        const db = await makeDb();
        const result = await db.collection('users').insertOne(userInfo);
        const insertedInfo = result.ops[0];
        return insertedInfo;
        
      }catch(error){
        return error;
      }
      
      
    }

    async function remove(){

    }

    async function update(){

    }
}

