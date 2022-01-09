const express = require('express');

const userController = require('../controllers/users');
const patientController = require('../controllers/patients');
const diagnosisController = require('../controllers/diagnosis');
const appointmentController = require('../controllers/appointment');
const financialTransactionController = require('../controllers/financialTransaction');
const inventoryController = require('../controllers/inventory');
const accessRightsController = require('../controllers/accessRights');

const makeCallBack = require('../expressCallback');

const makeUserRoutes = require('./usersRouter.js');
const makePatientRoutes = require('./patientsRouter.js');
const makeDiagnosisRouter = require('./diagnosisRouter');
const makeAppointmentRouter = require('./appointmentRouter.js');
const makeFinancialTransactionRouter = require('./financialTransactionRouter.js');
const makeInventoryRouter = require('./inventoryRouter');
const makeAccessRightsRouter = require('./accessRightsRouter');

const routes = express.Router();

const userRoutes = makeUserRoutes({ routes, makeCallBack, userController });
const patientRoutes = makePatientRoutes({ routes, makeCallBack, patientController });
const diagnosisRoutes = makeDiagnosisRouter({ routes, makeCallBack, diagnosisController });
const appointmentRoutes = makeAppointmentRouter({ routes, makeCallBack, appointmentController });
const financialTransactionRouter =
    makeFinancialTransactionRouter({ routes, makeCallBack, financialTransactionController });
const inventoryRouter = makeInventoryRouter({ routes, makeCallBack, inventoryController });
const accessRightsRouter = makeAccessRightsRouter({routes,makeCallBack,accessRightsController});

const routesService = Object.freeze({
    userRoutes, patientRoutes, diagnosisRoutes, appointmentRoutes, financialTransactionRouter,
    inventoryRouter,accessRightsRouter
});

module.exports = routesService;