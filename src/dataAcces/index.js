const {MongoClient,ObjectID} = require('mongodb');

const makeUsersCollection = require('./users');
const makePatientsCollection = require('./patients');
const makeDiagnosisCollection = require('./diagnosis');
const makeAppointmentCollection = require('./appointment');
const makeTransactionCollection = require('./financialTransaction');

const url = 'mongodb://localhost:27017';
const dbName = 'LittleClinc';// fix typo

const mongoOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true
};
const client = new MongoClient(url,mongoOptions);

async function makeDb(){
    if(!client.isConnected()){
        try{
        await client.connect();
        }
        catch(error){
            return error;
        }
    }
    return client.db(dbName);
}

const usersCollection = makeUsersCollection({makeDb,ObjectID});
const patientsCollection = makePatientsCollection({makeDb,ObjectID});
const diagnosisCollection = makeDiagnosisCollection({makeDb,ObjectID});
const appointmentCollection = makeAppointmentCollection({makeDb,ObjectID});
const financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});

module.exports = {
    usersCollection,patientsCollection,diagnosisCollection,appointmentCollection,
    financialTransactionCollection
}

