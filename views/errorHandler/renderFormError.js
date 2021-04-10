
module.exports = function renderFormError({inputTitle,message,inputType}){
    
    if (inputType == 'text' || inputType=='password'){
        const inputElement = document.querySelector(`#${inputTitle}`);
        const errorMsg = document.querySelector(`#${inputTitle} ~.form-error`);
        
        inputElement.classList.add('form-input-error');
        errorMsg.innerHTML = message;
        
        inputElement.addEventListener('input',()=>{
            inputElement.classList.remove('form-input-error');
            errorMsg.innerHTML = '';
        });
    }
    else if (inputType === 'textArray'){
        const inputElement = document.querySelector(`#${inputTitle}`);
        const errorMsg = document.querySelector(`#${inputTitle} ~.form-error`);
        const textInput = document.querySelector(`#${inputTitle} input[type='text']`);
        const addBtn = document.querySelector(`#${inputTitle} button`);

        
        textInput.classList.add('form-input-error');
        addBtn.classList.add('form-input-error');
        errorMsg.innerHTML = message;
        
        inputElement.addEventListener('input',()=>{
            
            textInput.classList.remove('form-input-error');
            addBtn.classList.remove('form-input-error');
            errorMsg.innerHTML = '';
        });
    }else if (inputType === 'radio'){
        const inputRadio = document.querySelector(`#${inputTitle} input[type="radio"]`);
        const errorMsg  = document.querySelector('.radio-box ~.form-error');

        inputRadio.addEventListener('input',()=>{
            inputElement.classList.remove('form-input-error');
            errorMsg.innerHTML = '';
        });
        
        errorMsg.innerHTML = message;
    }
    else if (inputType === 'textarea'){

        const inputElement = document.querySelector(`#${inputTitle}`);
        const errorMsg = document.querySelector(`#${inputTitle} ~.form-error`);

        inputElement.classList.add('form-input-error');
        inputElement.addEventListener('input',()=>{
            inputElement.classList.remove('form-input-error');
            errorMsg.innerHTML = '';
        });
        
        errorMsg.innerHTML = message;
        
    }
}