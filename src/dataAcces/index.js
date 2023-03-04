const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');

const makeCommonDb = require('./common');
const makeUsersCollection = require('./users');
const makePatientsCollection = require('./patients');
const makeDiagnosisCollection = require('./diagnosis');
const makeAppointmentCollection = require('./appointment');
const makeTransactionCollection = require('./financialTransaction');
const makeBalanceTransactionCollection = require('./transactionBalance');
const makeInventoryCollection = require('./inventory');
const makeAccessRightsCollection = require('./accessRights');

dotenv.config()

const dbUrl = 'mongodb://localhost:27017';//process.env.DB_URL;
const dbName = process.env.MONGO_DB;

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const client = new MongoClient(dbUrl, mongoOptions);
connectToDb();

async function connectToDb(){
    try {
        await client.connect();
        console.log('connected to database ....')
    }
    catch (error) {
        console.log(error)
        return error;
    }
}
function makeDb() {
    // find alternative for deprecated code
    // if (!client.isConnected()) {
    // }
    return client.db('easyClinic');
}


const commonDb = makeCommonDb({ makeDb, ObjectID });
const usersCollection = makeUsersCollection({ makeDb, ObjectID });
const patientsCollection = makePatientsCollection({ makeDb, ObjectID });
const diagnosisCollection = makeDiagnosisCollection({ makeDb, ObjectID });
const appointmentCollection = makeAppointmentCollection({ makeDb, ObjectID });
const financialTransactionCollection = makeTransactionCollection({ makeDb, ObjectID });
const balanceTransactionCollection = makeBalanceTransactionCollection({ makeDb, ObjectID });
const inventoryCollection = makeInventoryCollection({ makeDb, ObjectID });
const accessRightsCollection = makeAccessRightsCollection({ makeDb, ObjectID });

module.exports = {
    commonDb, usersCollection, patientsCollection, diagnosisCollection, appointmentCollection,
    financialTransactionCollection, balanceTransactionCollection, inventoryCollection,
    accessRightsCollection
}

