module.exports = function makeListAppointmentByPatientId({appointmentCollection}){

    return async function listAppointmentByPatientId({patientId})
    {
        return await appointmentCollection.findByPatientId({patientId})
    }
}