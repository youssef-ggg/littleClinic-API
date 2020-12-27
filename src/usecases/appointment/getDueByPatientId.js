module.exports = function makeGetAppointmentByPatientIDue({appointmentCollection}){

    return async function getAppointmentByPatientIdDue(patientId)
    {
        return await appointmentCollection.findByPatientIdDue({patientId});
    }
}