const {appointmentCollection} = require('../../dataAcces');

const makeAddAppointment = require('./addAppointment');
const makeGetAppointment = require('./getAppointment');
const makeListAppointmentByPatientId = require('./listByPatientId');
const makeGetAppointmentByPatientIdActive = require('./getActiveAppointments');
const makeGetAppointmentByPatientIdDue = require('./getDueByPatientId');
const makeListByDuration = require('./listByDuration');
const makeEditAppointment = require('./editAppointment');
const makeDeleteAppointmentById = require('./deleteAppointmentById');


const addAppointment = makeAddAppointment({appointmentCollection});
const getAppointment = makeGetAppointment({appointmentCollection});
const listAppointmentByPatientId = makeListAppointmentByPatientId({appointmentCollection});
const getAppointmentByPatientIdActive = makeGetAppointmentByPatientIdActive({appointmentCollection});
const getAppointmentByPatientIdDue = makeGetAppointmentByPatientIdDue({appointmentCollection});
const listByDuration = makeListByDuration({appointmentCollection});
const editAppointment = makeEditAppointment({appointmentCollection});
const deleteAppointmentById = makeDeleteAppointmentById({appointmentCollection});

const appointmentServices = Object.freeze({
    addAppointment,getAppointment,listAppointmentByPatientId,getAppointmentByPatientIdActive,
    getAppointmentByPatientIdDue,listByDuration,deleteAppointmentById,editAppointment
});

module.exports = appointmentServices;
