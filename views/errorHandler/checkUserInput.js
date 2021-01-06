
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

    //rearange steps in function 
    function createUserErrorHandler(userData,axiosAuth)
    {
        let hasError = false;
        const usernameRegexp = /^[a-zA-z_-][a-zA-z0-9_-]*$/;

        // use try catch to get errors
        axiosAuth.get(`/users/user/user?username=${userData.username}`)
            .then(existsResponse=>{
                const {data} = existsResponse;
                if (data.username == userData.username)
                {
                    const inputElement = document.querySelector('#username');
                    const errorMsg = document.querySelector('#username ~.form-error');
                    
                    inputElement.classList.add('form-input-error');
                    errorMsg.innerHTML= `This user name is already taken.`;
                    
                    inputElement.addEventListener('input',()=>{
                        inputElement.classList.remove('form-input-error');
                        errorMsg.innerHTML = '';
                    });
                    hasError = true;

                }
            });
        
        if(!userData.username.match(usernameRegexp))
        {
            hasError = true;
            const inputElement = document.querySelector('#username');
            const errorMsg = document.querySelector('#username ~.form-error');
            
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= `Invalid charachters used.`;
            
            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

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
                hasError = true;
            }
        }
        if (!validator.isAlpha(validator.blacklist(userTextData.name, ' ')))
        {
                const inputElement = document.querySelector(`#name`);
                const errorMsg = document.querySelector('#name ~.form-error');

                inputElement.classList.add('form-input-error');
                errorMsg.innerHTML= 'Name must only contian letters.';
                hasError = true;
        }
        else if(validator.blacklist(userTextData.name, ' ').length < 3)
        {
            
                const inputElement = document.querySelector(`#name`);
                const errorMsg = document.querySelector('#name ~.form-error');

                inputElement.classList.add('form-input-error');
                errorMsg.innerHTML= 'Name must be at least three charachters long.';
                hasError = true;

        }
        return hasError;
    }

    function userFormPassErrorHandle(userData)
    {
        const {password,confirmPassword} = userData;
        let hasError = false;

         if (password.length <8 && password.length>0){
            const inputElement = document.querySelector('#password');
            const errorMsg = document.querySelector('#password ~.form-error');
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Password must be at least 8 charachters long.';
            hasError = true
        }
        if (password!==confirmPassword)
        {
            const inputElement = document.querySelector('#confirmPassword');
            const errorMsg = document.querySelector('#confirmPassword ~.form-error');
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Password dosen\'t match.';
            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });
            hasError = true;
        }
        return hasError;
    }
    
    // function updateUserErrorHandler(userData){

    //     const {confirmPassword,accessRights,...userTextData} = userData;
    //     let hasError = false;
    //     for (const [key,value] of Object.entries(userTextData)){

    //         const inputElement = document.querySelector(`#${key}`);
    //         const errorMsg = document.querySelector(`#${key} ~.form-error`);
            
    //         inputElement.addEventListener('input',()=>{
    //             inputElement.classList.remove('form-input-error');
    //             errorMsg.innerHTML = '';
    //         });

    //         if(!value || value === "")
    //         {
    //             inputElement.classList.add('form-input-error');
    //             errorMsg.innerHTML= `Must have a ${key}.`;
    //             hasError = true;
    //         }
    //     }
    // }

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
        existingUsernameForm,
        userFormPassErrorHandle,
        createUserErrorHandler
    });
}