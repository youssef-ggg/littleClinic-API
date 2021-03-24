
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

    function updatePatientErrorHandler(patientData){

        let hasError = false;
        const {gender,...patientTextData} = patientData;
        const nameRegex = /^[a-zA-Z .']*$/;
        const {invalidEmptyInputHandler} = commonInputError();

        if(invalidEmptyInputHandler(patientTextData)){
            hasError = true;
        }

        if(patientTextData.name.length < 3)
        {
            renderFormError({inputTitle:'name',
                message:'Name must be at least three charcters.',
                inputType:'text'
            });
            hasError = true;
        }
        else if (!nameRegex.test(patientTextData.name)){
            renderFormError({inputTitle:'name',
                message:'Name must only contian letters.',
                inputType:'text'
            });
            hasError = true;
        }
        
        if(isNaN(patientTextData.balance)){
            renderFormError({inputTitle:'balance',
                message:'balance must be a number.',
                inputType:'text'
            });
            hasError = true;
        }

        if(!(parseInt(patientTextData.numberOfVisits)==patientTextData.numberOfVisits)){
            renderFormError({inputTitle:'numberOfVisits',
                message:'Number of visits must be an Integer.',
                inputType:'text'
            });
            hasError = true;

        }else if(parseInt(patientTextData.numberOfVisits)<0){
            renderFormError({inputTitle:'numberOfVisits',
                message:'Number of visits can\'t be a negative.',
                inputType:'text'
            });
            hasError = true;
        }

        return hasError;
    }

    


    return {
        createPatientErrorHandler,updatePatientErrorHandler
    }
}



