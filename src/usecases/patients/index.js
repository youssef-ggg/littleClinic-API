
const  {patientsCollection} = require('../../dataAcces');
const makeAddPatient = require('./addPatient');
const makeListsPatient = require('./listPatients');
const makeGetPatient = require('./getPatient');
const makeUpdatePatient = require('./updatePatient');
const makeGetPatientsPaginated = require('./getPatientsPaginated');
const makeGetPatientCount =require('./getPatientCount');

const addPatient = makeAddPatient({patientsCollection});
const listPatients = makeListsPatient({patientsCollection});
const getPatient = makeGetPatient({patientsCollection});
const updatePatient = makeUpdatePatient({patientsCollection});
const getPatientsPaginated = makeGetPatientsPaginated({patientsCollection});
const getPatientCount = makeGetPatientCount({patientsCollection});

const patientServices = Object.freeze({
    addPatient,listPatients,getPatient,updatePatient,getPatientsPaginated,getPatientCount

});

module.exports = patientServices;