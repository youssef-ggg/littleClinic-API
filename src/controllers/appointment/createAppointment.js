const { app } = require("electron");

module.exports = function makeCreateAppointment({addAppointment}){

    return async function createAppointment(appointment){

        try {
            
            const createdAppointment = await addAppointment(appointment);
            return createdAppointment;
            
        } catch (error) {
            console.log(error);
            return error;
        }


    }
}