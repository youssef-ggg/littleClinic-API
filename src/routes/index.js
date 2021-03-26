const express = require('express');

const  userController = require('../controllers/users');
const patientController = require('../controllers/patients');
const diagnosisController = require('../controllers/diagnosis');

const makeCallBack = require('../expressCallback');

const makeUserRoutes = require('./usersRouter.js');
const makePatientRoutes = require('./patientsRouter.js');
const makeDiagnosisRouter  = require('./diagnosisRouter');

const routes = express.Router();

const userRoutes = makeUserRoutes({routes,makeCallBack,userController});
const patientRoutes = makePatientRoutes({routes,makeCallBack,patientController});
const diagnosisRoutes = makeDiagnosisRouter({routes,makeCallBack,diagnosisController});

const routesService=Object.freeze({
    userRoutes,patientRoutes,diagnosisRoutes
});

module.exports = routesService;