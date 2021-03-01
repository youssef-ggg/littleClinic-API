
const buildMakeUser = require('./user');
const buildMakePatient = require('./patient');
const buildMakeDiagnosis = require('./diagnosis');
const buildMakeMedicalRecord = require('./medicalRecord');
const buildMakeAppointment = require('./appointment');

const makeUser = buildMakeUser();
const makePatient = buildMakePatient();
const makeDiagnosis = buildMakeDiagnosis();
const makeMedicalRecord = buildMakeMedicalRecord();
const makeAppointment = buildMakeAppointment();

module.exports = { makeUser,makePatient,makeDiagnosis,makeMedicalRecord,makeAppointment};
