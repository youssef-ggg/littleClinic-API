const appointmentServices = require('../../usecases/appointment');

const makeCreateAppointment = require('./createAppointment');
const makeGetAppointmentById = require('./getAppointmentById');
const makeGetByPatientId = require('./getByPatientId');
const makeGetByPatientIdActive = require('./getByPatientIdActive');
const makeGetByPatientIdDue = require('./getByPatientIdDue');
const makeGetByDateDuration = require('./getByDateDuration');
const makeDeleteSingleAppointment = require('./deleteSingleAppointment');
const makeSetUpdateAppointment = require('./updateAppointment');

const {addAppointment,getAppointmentByPatientId,getAppointment,
    getAppointmentByPatientIdActive,getAppointmentByPatientIdDue,getByDuration,
    deleteAppointmentById,updateAppointment} = appointmentServices;

const createAppointment = makeCreateAppointment({addAppointment});
const getAppointmentById = makeGetAppointmentById({getAppointment});
const getByPatientId = makeGetByPatientId({getAppointmentByPatientId});
const getByPatientIdActive = makeGetByPatientIdActive({getAppointmentByPatientIdActive});
const getByPatientIdDue = makeGetByPatientIdDue({getAppointmentByPatientIdDue});
const getByDateDuration = makeGetByDateDuration({getByDuration});
const deleteSingleAppointment = makeDeleteSingleAppointment({deleteAppointmentById});
const setUpdateAppointment = makeSetUpdateAppointment({updateAppointment});

const appointmentController = Object.freeze({
    createAppointment,getByPatientId,getByPatientIdActive,getByPatientIdDue,getAppointmentById,
    getByDateDuration,deleteSingleAppointment,setUpdateAppointment
});

module.exports = appointmentController;