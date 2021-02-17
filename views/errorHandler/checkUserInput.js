
module.exports = function makeErrorTnputHandler ({validator,renderFormError}){

    function inputErrorHandler(inputObj){
        
        const inputArray = Object.entries(inputObj);
        let hasError = false;
        for ([key,value] of inputArray){
            
            if(validator.isEmpty(value))
            {
                hasError = true;
                document.querySelector(`.input-container input[name="${key}"]`)
                        .parentElement.setAttribute('data-error',`Must have a ${key}!`);
            }
            else if(!validator.matches(value, "^[a-zA-Z0-9_]*$"))
            {
                hasError = true;
                document.querySelector(`.input-container input[name="${key}"]`)
                        .parentElement.setAttribute('data-error',`Invalid ${key}!`);
            }
        }
        return hasError;
    }

    function passMisMatchHandle(password,confirmPassword){
        
        const passInpt = document
            .querySelector('.input-container input[name="password"]').parentElement;
        const confPassInptD = document
            .querySelector('.input-container input[name="confirmPassword"]').parentElement;
        
        
        if (password == ''){
            confPassInptD.setAttribute('data-error','must have a password to match!');
            return true;
        }
        else if (password.length <8){
            passInpt.setAttribute('data-error','password at least 8 characters!');
            confPassInptD.setAttribute('data-error','Invalid password to match!');
            
            return true;
        }
        else if (password!==confirmPassword){
            confirmPassword.setAttribute('data-error','Please make sure your passwords match!');
            return true;
        }
        return false;
    }

    
    function createUserErrorHandler(userData,userExists)
    {
        let hasError = false;
        const usernameRegexp = /^[a-zA-z._-][a-zA-z0-9._-]*$/;

        if (userExists!=null)
        {
            renderFormError({inputTitle:'username',
            message:'This user name is already taken.',inputType:'text'});
            hasError = true;
        }
        
        
        if(!userData.username.match(usernameRegexp))
        {
            hasError = true;
            renderFormError({inputTitle:'username',
            message:'Invalid charachters used.',inputType:'text'});
        }
        if(userFormErrorHandler(userData))
        {
            hasError = true;
        }
        if(userFormPassErrorHandle(userData))
        {
            hasError = true;
        }
        return hasError;
    }

    function userFormErrorHandler(userData){

        const {confirmPassword,accessRights,...userTextData} = userData;
        let hasError = false;
        if(validator.blacklist(userTextData.username,' ').length < 3){
            
            renderFormError({inputTitle:'username',
                message:'Username must be at least three characters.',inputType:'text'});
            hasError = true;

        }
        if (!validator.isAlpha(validator.blacklist(userTextData.name, ' '))){

            renderFormError({inputTitle:'name',
                message:'Name must only contian letters.',inputType:'text'});
            hasError = true;
        }
        else if(validator.blacklist(userTextData.name, ' ').length < 3){

            renderFormError({inputTitle:'name',
            message:'Name must be at least three charachters long.',inputType:'text'});
            hasError = true;
        }
        if(invalidEmptyInputHandler(userTextData)){
            hasError = true;
        }
        return hasError;
    }

    function userFormPassErrorHandle(userData)
    {
        const {password,confirmPassword} = userData;
        let hasError = false;

         if (password.length <8 && password.length>0){
            
            renderFormError({inputTitle:'password',
                message:'Password must be at least 8 charachters long.',inputType:'text'});
            
            hasError = true
        }
        if (password!==confirmPassword){

            renderFormError({inputTitle:'confirmPassword',
                message:'Password dosen\'t match.',inputType:'text'});
            hasError = true;
        }
        return hasError;
    }

    function invalidEmptyInputHandler(userTextData)
    {
        let hasError = false;
        for (const [key,value] of Object.entries(userTextData)){

            if(!value || value === ""){

                renderFormError({inputTitle:key,message:`Must have a ${key}.`,inputType:'text'});
                hasError = true;
            }
        }

        return hasError;
    }

    function updateUserDataErrorHandle(userData){
        let hasError = false;
        const {accessRights,...updatedTextData} = userData;
        const nameRegex = /^[a-zA-Z .']*$/;
        const occupationRegex = /^[a-zA-Z0-9 '/_/.-]*$/;

        if(invalidEmptyInputHandler(updatedTextData)){
            hasError = true;
        }
        if(!('accessRights' in userData))
        {
            renderFormError({inputTitle:'accessRights',
                message:`can't update to empty access rights.`,inputType:'textArray'});
            hasError = true;
        }
        if(!nameRegex.test(updatedTextData.name)){
            renderFormError({inputTitle:'name',
                message:'Name must only contian letters.',inputType:'text'});
                hasError = true;
        }
        if(!occupationRegex.test(updatedTextData.occupation))
        {
            renderFormError({inputTitle:'occupation',
                message:'Occupation can\'t contian Invalid characters.',
                inputType:'text'
            });
            hasError = true;
        }

        return hasError;

    }
    
    return Object.freeze({
        inputErrorHandler,
        passMisMatchHandle,
        userFormErrorHandler,
        userFormPassErrorHandle,
        updateUserDataErrorHandle,
        createUserErrorHandler
    });
}