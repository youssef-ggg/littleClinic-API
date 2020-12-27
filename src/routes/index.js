const express = require('express');

const  userController = require('../controllers/users');
const patientController = require('../controllers/patients');

const makeCallBack = require('../expressCallback');

const makeUserRoutes = require('./usersRouter.js');
const makePatientRoutes = require('./patientsRouter.js');

const routes = express.Router();

const userRoutes = makeUserRoutes({routes,makeCallBack,userController});
const patientRoutes = makePatientRoutes({routes,makeCallBack,patientController});

const routesService=Object.freeze({
    userRoutes,patientRoutes
});

module.exports = routesService;