module.exports = function MakeEditAppointment({appointmentCollection}){

    return async function editAppointment(updatedAppointment){


        const existing = await appointmentCollection.findById({ id:updatedAppointment.id });
        if (!existing) {
            throw new RangeError('Appointment not found.')
        }

        return await appointmentCollection.update(updatedAppointment); 
    }
    
}