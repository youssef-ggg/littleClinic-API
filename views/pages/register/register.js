const {ipcRenderer} = require('electron');
const {inputErrorHandler,passMisMatchHandle,existsError} = require('../../errorHandler');

const submit = document.querySelector('#sign-up');

document.querySelectorAll('.input-container .input').forEach(inpEl=>{
    inpEl.addEventListener('input',()=>{
        if(inpEl.parentElement.getAttribute('data-error'))
            inpEl.parentElement.removeAttribute('data-error')});
});


submit.addEventListener('click',function(event){
    event.preventDefault();
    const user = {
        username:document.querySelector('input[name="username"]').value,
        name:document.querySelector('input[name="name"]').value,
        occupation:document.querySelector('input[name="occupation"]').value,
        password:document.querySelector('input[name="password"]').value,
        confirmPassword:document.querySelector('input[name="confirmPassword"]').value,
    };
    const {username,name,password,occupation,confirmPassword} = user;
    const invalidInput = inputErrorHandler({username,name,occupation,password});
    const passMismatch = passMisMatchHandle(password,confirmPassword);
    
    
    if(!invalidInput&&!passMismatch)    
        ipcRenderer.send('registerUser',user);
});


ipcRenderer.on('error',function(event,error){
    existsError(error);
});

