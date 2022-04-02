const renderFormError = require('./renderFormError');

module.exports = function commonErrorInput(){

    
    function invalidEmptyInputHandler(data){
        let hasError = false;
        for (const [key,value] of Object.entries(data)){
            
            if(key === undefined || value === null || value === ""){
                
                renderFormError({inputTitle:key,message:`Must have a ${key}.`,inputType:'text'});
                hasError = true;
            }
        }

        return hasError;
    }

    return {
        invalidEmptyInputHandler
    }
    
}
