const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let connection, db;

async function makeDb(){
    connection = connection || 
        (await MongoClient.connect(
            global.__MONGO_URI__,
            {useNewUrlParser:true}
            ));
    db = db  || (await connection.db(global.__MONGO_DB_NAME__));
    return db;
}

async function closeDb(){
    await connection.close();
    await db.close();
}

async function clearDb() {
    await db.collection('users').deleteMany({})
    return true
  }

module.exports = {
    makeDb,
    closeDb,
    clearDb,
    connection,
    db
}