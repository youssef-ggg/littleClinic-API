
const  {patientsCollection} = require('../../dataAcces');
const makeAddPatient = require('./addPatient');
const makeListPatient = require('./listPatients');
const makeGetPatient = require('./getPatient');
const makeUpdatePatient = require('./updatePatient');
const makeListPatientsPaginated = require('./listPatientsPaginated');
const makeGetPatientCount =require('./getPatientCount');

const addPatient = makeAddPatient({patientsCollection});
const listPatients = makeListPatient({patientsCollection});
const getPatient = makeGetPatient({patientsCollection});
const updatePatient = makeUpdatePatient({patientsCollection});
const listPatientsPaginated = makeListPatientsPaginated({patientsCollection});
const getPatientCount = makeGetPatientCount({patientsCollection});

const patientServices = Object.freeze({
    addPatient,listPatients,getPatient,updatePatient,listPatientsPaginated,getPatientCount

});

module.exports = patientServices;