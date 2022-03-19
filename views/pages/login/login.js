const { ipcRenderer } = require('electron');
const axios = require('axios');

const loginErrorHandler = require('../../errorHandler/loginErrors');

const API_URL = 'http://localhost:5000';//remove from here, maybe use .env file.
const submit = document.querySelector('#loginBtn');

document.querySelectorAll('.input-container .input').forEach(inpEl => {
    inpEl.addEventListener('input', () => {
        if (inpEl.parentElement.getAttribute('data-error'))
            inpEl.parentElement.removeAttribute('data-error')
    });
});

submit.addEventListener('click', async function (event) {
    event.preventDefault();
    const userLogin = {
        username: document.querySelector('input[name="username"]').value,
        password: document.querySelector('input[name="password"]').value,
    }
    try {
        const response = await axios.post(`${API_URL}/users/login`, { ...userLogin });

        const { user, token, userAccess } = response.data;
        if (user && token) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('loginToken', JSON.stringify(token));
            if (userAccess) {
                sessionStorage.setItem('userAccess', JSON.stringify(userAccess));

            } else {
                sessionStorage.setItem('userAccess', JSON.stringify([]));
            }
            const { data } = response;
            ipcRenderer.send('login', data);
        }
    } catch (error) {
        //TODO ADD error log
        console.log(error);
        if (error.response.data && error.response.data.errorMessage) {
            const { field, errorMessage } = error.response.data;
            loginErrorHandler({ field, errorMessage });
        }

    }
});