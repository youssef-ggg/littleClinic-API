const express = require('express');

const  userController = require('../controllers/users');
const patientController = require('../controllers/patients');
const diagnosisController = require('../controllers/diagnosis');
const appointmentController = require('../controllers/appointment');
const financialTransactionController = require('../controllers/financialTransaction');

const makeCallBack = require('../expressCallback');

const makeUserRoutes = require('./usersRouter.js');
const makePatientRoutes = require('./patientsRouter.js');
const makeDiagnosisRouter  = require('./diagnosisRouter');
const makeAppointmentRouter = require('./appointmentRouter.js');
const makeFinancialTransactionRouter = require('./financialTransactionRouter.js');

const routes = express.Router();

const userRoutes = makeUserRoutes({routes,makeCallBack,userController});
const patientRoutes = makePatientRoutes({routes,makeCallBack,patientController});
const diagnosisRoutes = makeDiagnosisRouter({routes,makeCallBack,diagnosisController});
const appointmentRoutes = makeAppointmentRouter({routes,makeCallBack,appointmentController});
const financialTransactionRouter = 
    makeFinancialTransactionRouter({routes,makeCallBack,financialTransactionController});

const routesService=Object.freeze({
    userRoutes,patientRoutes,diagnosisRoutes,appointmentRoutes,financialTransactionRouter
});

module.exports = routesService;