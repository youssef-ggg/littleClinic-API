const argon2  = require('argon2');

const buildMakeUser = require('./user');
const buildMakePatient = require('./patient');
const buildMakeDiagnosis = require('./diagnosis');
const buildMakeMedicalRecord = require('./medicalRecord');
const buildMakeAppointment = require('./appointment');

const makeUser = buildMakeUser({hashPassword});
const makePatient = buildMakePatient();
const makeDiagnosis = buildMakeDiagnosis();
const makeMedicalRecord = buildMakeMedicalRecord();
const makeAppointment = buildMakeAppointment();

async function hashPassword (password){
    try{
        return await argon2.hash(password); 

    }catch(error){
        return error;
    }    
}



module.exports = { makeUser,makePatient,makeDiagnosis,makeMedicalRecord,makeAppointment};
