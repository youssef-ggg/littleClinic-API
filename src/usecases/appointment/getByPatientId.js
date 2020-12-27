module.exports = function makeGetAppointmentByPatientId({appointmentCollection}){

    return async function getAppointmentByPatientId(patientId)
    {
        return await appointmentCollection.findByPatientId({patientId})
    }
}