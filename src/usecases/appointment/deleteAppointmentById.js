module.exports = function makeDeleteAppointmentById({appointmentCollection}){

    return async function deleteAppointmentById(appointmentInfo){

        return await appointmentCollection.removeById(appointmentInfo); 
    }
}
 