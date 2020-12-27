module.exports = function makeGetAppointmentById({getAppointment}){

    return async function getAppointmentById(id)
    {
        const appointment = await getAppointment(id);

        return appointment;
    }

}