
module.exports = function renderFormError({inputTitle,message}){

    const inputElement = document.querySelector(`#${inputTitle}`);
    const errorMsg = document.querySelector(`#${inputTitle} ~.form-error`);
    
    inputElement.classList.add('form-input-error');
    errorMsg.innerHTML = message;
    
    inputElement.addEventListener('input',()=>{
        inputElement.classList.remove('form-input-error');
        errorMsg.innerHTML = '';
    });
}