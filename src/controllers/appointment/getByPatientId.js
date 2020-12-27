module.exports = function makeGetByPatientId({getAppointmentByPatientId}){

    return async function getByPatientId(patientId)
    {
        const appointmentList = await getAppointmentByPatientId(patientId);
        
        return appointmentList;
    }

}