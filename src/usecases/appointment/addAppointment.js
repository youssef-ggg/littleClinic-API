const {makeAppointment} = require('../../models');

module.exports = function makeAddAppointment({appointmentCollection}){

    return async function addAppointment(appointmentData)
    {
        
        const appointment = makeAppointment(appointmentData);

        return appointmentCollection.insert({
            title: appointment.getTitle(),
            patientName : appointment.getPatientName(),
            time : appointment.getTime(),
            date : appointment.getDate(),
            patientId : appointment.getPatientId(),
            createdOn : appointment.getCreatedOn(),
            modifiedOn : appointment.getModifiedOn(),
        });
    }

}