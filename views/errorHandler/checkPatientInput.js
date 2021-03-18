
module.exports = function patientErrorHandler({commonInputError,renderFormError}){

    function createPatientErrorHandler(patientData){

        let hasError = false;
        const {name,phoneNumber,birthDate,gender} = patientData;
        const nameRegex = /^[a-zA-Z .']*$/;
        const {invalidEmptyInputHandler} = commonInputError();

        if(invalidEmptyInputHandler({name,phoneNumber,birthDate})){
            hasError = true;
        }

        if(gender == null || gender == '')
        {
            renderFormError({inputTitle:'gender',
                message:'Must have a gender.',
                inputType:'radio'
            });
            hasError = true;
        }
        if(!nameRegex.test(name)){
            renderFormError({inputTitle:'name',
                message:'Name must only contian letters.',
                inputType:'text'
            });
            hasError = true;
        }else if (name.length < 3){
            renderFormError({inputTitle:'name',
                message:'Name must be at least three charcters.',
                inputType:'text'
            });
            hasError = true;
        }
    
    
        
        return hasError;
    
    }


    return {
        createPatientErrorHandler,
    }
}



