module.exports = function loginErrorHandler (errorData){

    const {field,errorMessage} = errorData;
    if(field === 'username')
        document.querySelector('.input-container input[name="username"]')
            .parentElement.setAttribute('data-error',errorMessage);
    else if(field === 'password')
        document.querySelector('.input-container input[name="password"]')
            .parentElement.setAttribute('data-error',errorMessage);
}