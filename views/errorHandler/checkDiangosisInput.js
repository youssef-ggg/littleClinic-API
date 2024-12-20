module.exports = function diagnosisErrorHandler({renderFormError}){

    function createDiagnosisErrorHandler(diagnosisData){
        
        let hasError = false;
        const {cheifComplaint,problems} = diagnosisData;
        if(cheifComplaint == null || cheifComplaint == undefined || cheifComplaint ==''){
            hasError = true;
            renderFormError({
                inputTitle:'cheifComplaint',
                message:'Diagnosis must have a Chief Complaint.',
                inputType:'textarea'
            });
        }

        if (problems === undefined|| problems === null || problems.length === 0){
            hasError = true;
            renderFormError({
                inputTitle:'problems',
                message:'Must be diagnosied with a problem.',
                inputType:'textArray'
            });
        }
        return hasError

    }

    function updateDiagnosisErrorHandler(diagnosisData){
        
        let hasError = false;
        const {cheifComplaint,problems} = diagnosisData;
        if(cheifComplaint == null || cheifComplaint == undefined || cheifComplaint ==''){
            hasError = true;
            renderFormError({
                inputTitle:'cheifComplaint',
                message:'Diagnosis must have a Chief Complaint.',
                inputType:'textarea'
            });
        }
        
        if (problems === undefined|| problems === null || problems.length === 0){
            hasError = true;
            renderFormError({
                inputTitle:'problems',
                message:'Must be diagnosied with a problem.',
                inputType:'textArray'
            });
        }
        
        return hasError;
    }




    //TODO: creatediagnosis and update diagnosis handler are the same code change this later
    return {
        createDiagnosisErrorHandler,updateDiagnosisErrorHandler
    }
}