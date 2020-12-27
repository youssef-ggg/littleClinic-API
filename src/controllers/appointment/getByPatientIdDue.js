module.exports = function makeGetByPatientDue({getAppointmentByPatientIdDue}){

    return async function getByPatientDue(patientId){

        const appointmentList = await getAppointmentByPatientIdDue(patientId);
        
        return appointmentList;
    }
}