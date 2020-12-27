module.exports = function MakeUpdateAppointment({appointmentCollection}){

    return async function updateAppointment(updatedAppointment){

        return await appointmentCollection.update(updatedAppointment); 
    }
    
}