module.exports = function makeGetByPatientIdActive({getAppointmentByPatientIdActive}){

    return async function getByPatientIdActive(patientId)
    {
        const appointmentList = await getAppointmentByPatientIdActive(patientId);
        
        return appointmentList;
    }

}