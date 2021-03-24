const {jwtVerifyToken} = require('../../jwtAuthorization');
const {addPatient,listPatients,getPatient,editPatient,
    listPatientsPaginated,getPatientCount} = require('../../usecases/patients');
const makeCreatepatient = require('./createPatient');
const makeGetPatients = require('./getPatients');
const makeGetPatientByID = require('./getPatientByID');
const makeUpdatePatient = require('./updatePatient');
const makeGetPatientsPaginated = require('./getPatientsPaginated');
const makeGetNumberOfPatients = require('./getNumberOfPatients');

const createPatient = makeCreatepatient({addPatient,jwtVerifyToken});
const getPatientsList = makeGetPatients({listPatients,jwtVerifyToken});
const getPatientByID = makeGetPatientByID({getPatient,jwtVerifyToken});
const updatePatient = makeUpdatePatient({editPatient,jwtVerifyToken});
const getPatientsPaginated  = makeGetPatientsPaginated({listPatientsPaginated,jwtVerifyToken});
const getNumberOfPatients = makeGetNumberOfPatients({getPatientCount,jwtVerifyToken});

const patientController = Object.freeze({
    createPatient,getPatientsList,getPatientByID,updatePatient,getPatientsPaginated,
    getNumberOfPatients
});



module.exports = patientController;