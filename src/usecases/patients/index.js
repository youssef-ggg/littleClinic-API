
const  {patientsCollection} = require('../../dataAcces');
const makeAddPatient = require('./addPatient');
const makeListPatient = require('./listPatients');
const makeGetPatient = require('./getPatient');
const makeEditPatient = require('./editPatient');
const makeListPatientsPaginated = require('./listPatientsPaginated');
const makeGetPatientCount =require('./getPatientCount');

const addPatient = makeAddPatient({patientsCollection});
const listPatients = makeListPatient({patientsCollection});
const getPatient = makeGetPatient({patientsCollection});
const editPatient = makeEditPatient({patientsCollection});
const listPatientsPaginated = makeListPatientsPaginated({patientsCollection});
const getPatientCount = makeGetPatientCount({patientsCollection});

const patientServices = Object.freeze({
    addPatient,listPatients,getPatient,editPatient,listPatientsPaginated,getPatientCount

});

module.exports = patientServices;