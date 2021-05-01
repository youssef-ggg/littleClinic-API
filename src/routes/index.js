const express = require('express');

const  userController = require('../controllers/users');
const patientController = require('../controllers/patients');
const diagnosisController = require('../controllers/diagnosis');
const appointmentController = require('../controllers/appointment');

const makeCallBack = require('../expressCallback');

const makeUserRoutes = require('./usersRouter.js');
const makePatientRoutes = require('./patientsRouter.js');
const makeDiagnosisRouter  = require('./diagnosisRouter');
const makeAppointmentRouter = require('./appointmentRouter.js');

const routes = express.Router();

const userRoutes = makeUserRoutes({routes,makeCallBack,userController});
const patientRoutes = makePatientRoutes({routes,makeCallBack,patientController});
const diagnosisRoutes = makeDiagnosisRouter({routes,makeCallBack,diagnosisController});
const appointmentRoutes = makeAppointmentRouter({routes,makeCallBack,appointmentController});

const routesService=Object.freeze({
    userRoutes,patientRoutes,diagnosisRoutes,appointmentRoutes
});

module.exports = routesService;