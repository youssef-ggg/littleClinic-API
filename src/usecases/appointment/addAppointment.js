const {makeAppointment} = require('../../models');

module.exports = function makeAddAppointment({appointmentCollection}){

    return async function addAppointment(appointmentData)
    {
        
        const appointment = makeAppointment(appointmentData);

        const exists = await appointmentCollection
            .findByDateTime({date:appointment.getDate()});
        
        if(exists){
            return {
                statusCode:409,
                errorMessage:'Two appointments can\'t have the same date and time.',
            }
        }

        return appointmentCollection.insert({
            title: appointment.getTitle(),
            patientName : appointment.getPatientName(),
            date : appointment.getDate(),
            patientId : appointment.getPatientId(),
            createdOn : appointment.getCreatedOn(),
            modifiedOn : appointment.getModifiedOn(),
        });
    }

}