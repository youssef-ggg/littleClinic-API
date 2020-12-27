module.exports = function makeSetUpdateAppointment({updateAppointment}){

    return async function setUpdateAppointment(updatedAppointment){
        
        const result = await updateAppointment(updatedAppointment);

        return result;
    }
}