
module.exports = function makeErrorTnputHandler ({validator}){

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

    function existsError(error){
        document.querySelector('.input-container input[name="username"]')
                        .parentElement.setAttribute('data-error',error);
    }

    function userFormErrorHandler(userData){

        const {confirmPassword,accessRights,...userTextData} = userData;

        for (const [key,value] of Object.entries(userTextData)){

            const inputElement = document.querySelector(`#${key}`);
            const errorMsg = document.querySelector(`#${key} ~.form-error`);
            
            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            if(!value || value === "")
            {
                inputElement.classList.add('form-input-error');
                errorMsg.innerHTML= `Must have a ${key}.`;
                haserror = true;
            }
        }

        const {password} = userTextData;
         if (password.length <8 && password.length>0){
            const inputElement = document.querySelector('#password');
            const errorMsg = document.querySelector('#password ~.form-error');
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Password must be at least 8 charachters long.';
            haserror = true
        }
        if (password!==confirmPassword)
        {
            const inputElement = document.querySelector('#confirmPassword');
            const errorMsg = document.querySelector('#confirmPassword ~.form-error');
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Password dosen\'t match.';
            haserror = true;
            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });
        }
    }
    
    function existingUsernameForm(){
        const inputElement = document.querySelector('#username');
            const errorMsg = document.querySelector('#username ~.form-error');
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'This username is taken.';
            haserror = true;
            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });
    }

    return Object.freeze({
        inputErrorHandler,
        passMisMatchHandle,
        existsError,
        userFormErrorHandler,
        existingUsernameForm
    });
}