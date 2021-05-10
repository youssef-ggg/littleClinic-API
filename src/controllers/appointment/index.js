const appointmentServices = require('../../usecases/appointment');
const  {jwtSignToken,jwtVerifyToken} = require('../../jwtAuthorization');

const makeCreateAppointment = require('./createAppointment');
const makeGetAppointmentById = require('./getAppointmentById');
const makeGetByPatientId = require('./getByPatientId');
const makeGetByPatientIdActive = require('./getByPatientIdActive');
const makeGetByPatientIdDue = require('./getByPatientIdDue');
const makeGetByDateDuration = require('./getByDateDuration');
const makeDeleteSingleAppointment = require('./deleteSingleAppointment');
const makeUpdateAppointment = require('./updateAppointment');

const {addAppointment,listAppointmentByPatientId,getAppointment,
    getAppointmentByPatientIdActive,getAppointmentByPatientIdDue,getByDuration,
    deleteAppointmentById,editAppointment} = appointmentServices;

const createAppointment = makeCreateAppointment({addAppointment,jwtVerifyToken});
const getAppointmentById = makeGetAppointmentById({getAppointment,jwtVerifyToken});
const getByPatientId = makeGetByPatientId({listAppointmentByPatientId,jwtVerifyToken});
const getByPatientIdActive = makeGetByPatientIdActive({getAppointmentByPatientIdActive});
const getByPatientIdDue = makeGetByPatientIdDue({getAppointmentByPatientIdDue});
const getByDateDuration = makeGetByDateDuration({getByDuration});
const deleteSingleAppointment = makeDeleteSingleAppointment({deleteAppointmentById,jwtVerifyToken});
const updateAppointment = makeUpdateAppointment({editAppointment,jwtVerifyToken});

const appointmentController = Object.freeze({
    createAppointment,getByPatientId,getByPatientIdActive,getByPatientIdDue,getAppointmentById,
    getByDateDuration,deleteSingleAppointment,updateAppointment
});

module.exports = appointmentController;