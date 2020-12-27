module.exports = function makeDeleteSingleAppointment({deleteAppointmentById}){

    return async function deleteSingleAppointment(appointmentInfo)
    {
        const result = await deleteAppointmentById(appointmentInfo);

        return result;
    }

}