module.exports = function appointmentErrorHandler({commonInputError,renderFromError}){

    function createAppointmentErrorHandler(appointmentData){
        
        let hasError = false;
        const {patientId,...inputData} = appointmentData;
        const {invalidEmptyInputHandler} = commonInputError();

        if(invalidEmptyInputHandler(inputData)){
            hasError = true;
        }

        return hasError;
    }

    return {
        createAppointmentErrorHandler
    }

}