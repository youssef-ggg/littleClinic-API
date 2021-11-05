const {MongoClient,ObjectID} = require('mongodb');
const dotenv = require('dotenv');

const makeUsersCollection = require('./users');
const makePatientsCollection = require('./patients');
const makeDiagnosisCollection = require('./diagnosis');
const makeAppointmentCollection = require('./appointment');
const makeTransactionCollection = require('./financialTransaction');
const makeBalanceTransactionCollection = require('./transactionBalance');
const makeInventoryCollection = require('./inventory');

dotenv.config()

const dbUrl = process.env.DB_URL;
const dbName = process.env.MONGO_DB;

const mongoOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true
};
const client = new MongoClient(dbUrl,mongoOptions);

async function makeDb(){
    if(!client.isConnected()){
        try{
        await client.connect();
        }
        catch(error){
            return error;
        }
    }
    return client.db('LittleClinc');
}

const usersCollection = makeUsersCollection({makeDb,ObjectID});
const patientsCollection = makePatientsCollection({makeDb,ObjectID});
const diagnosisCollection = makeDiagnosisCollection({makeDb,ObjectID});
const appointmentCollection = makeAppointmentCollection({makeDb,ObjectID});
const financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
const balanceTransactionCollection  = makeBalanceTransactionCollection({makeDb,ObjectID});
const inventoryCollection = makeInventoryCollection({makeDb,ObjectID});

module.exports = {
    usersCollection,patientsCollection,diagnosisCollection,appointmentCollection,
    financialTransactionCollection,balanceTransactionCollection,inventoryCollection
}

