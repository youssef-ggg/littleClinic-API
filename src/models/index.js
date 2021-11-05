const {typeEnum} = require('../utils/enums')

const buildMakeUser = require('./user');
const buildMakePatient = require('./patient');
const buildMakeDiagnosis = require('./diagnosis');
const buildMakeMedicalRecord = require('./medicalRecord');
const buildMakeAppointment = require('./appointment');
const buildMakeFinancialTransaction = require('./financialTransaction');
const buildMakeBalanceTransaction = require('./balanceTransaction');
const buildMakeInventoryItem = require('./inventorytItem');

const makeUser = buildMakeUser();
const makePatient = buildMakePatient();
const makeDiagnosis = buildMakeDiagnosis();
const makeMedicalRecord = buildMakeMedicalRecord();
const makeAppointment = buildMakeAppointment();
const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});
const makeBalanceTransaction = buildMakeBalanceTransaction();
const makeInventoryItem = buildMakeInventoryItem();

module.exports = { makeUser,makePatient,makeDiagnosis,makeMedicalRecord,makeAppointment,
    makeFinancialTransaction,makeBalanceTransaction,makeInventoryItem
};
