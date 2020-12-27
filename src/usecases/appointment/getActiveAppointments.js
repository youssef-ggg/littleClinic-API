module.exports = function makeGetAppointmentByPatientIdActive({appointmentCollection}){

    return async function getAppointmentByPatientIdActive(patientId)
    {
        return await appointmentCollection.findByPatientIdActive({patientId})
    }
}