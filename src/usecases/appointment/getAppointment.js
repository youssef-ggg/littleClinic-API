module.exports = function makeGetAppointment({appointmentCollection}){

    return async function getAppointment({id}){
        
        return await appointmentCollection.findById({id});
    }
}