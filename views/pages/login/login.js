const fs = require('fs')
const { ipcRenderer } = require('electron');
const axios = require('axios');

const loginErrorHandler = require('../../errorHandler/loginErrors');
const modal = require('../../utilites/modal');
const toastNotify  = require('../../utilites/toastNotify');
const { usersRegisterModal } = require('../../config/users');
const { createFirstUserErrorHandler, passMisMatchHandle } = require('../../errorHandler');

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

const loginContent = document.querySelector('body');
const appDataJson = fs.existsSync('data.json')
if (appDataJson) {
    const appDataJson = fs.readFileSync('data.json')
    const appData = JSON.parse(appDataJson)
    if (appData['appInitialized']) {

    } else {
        createRegisterModal()
    }
} else {
    const appData = '{"appInitialized" : false}'
    const res = fs.writeFileSync('data.json', appData)

    createRegisterModal()
}

async function createRegisterModal() {
    modal(loginContent, usersRegisterModal());
    const signIn = document.querySelector('#submit');

    signIn.addEventListener('click', async function (event) {
        const overlay = document.querySelector('.modal-overlay');


        const user = {
            username: document.querySelector('input[name="regusername"]').value,
            name: document.querySelector('input[name="name"]').value,
            occupation: document.querySelector('input[name="occupation"]').value,
            password: document.querySelector('input[name="regpassword"]').value,
            confirmPassword: document.querySelector('input[name="confirmPassword"]').value,
        };

        user.accessRights = 'ADMIN'
        const { username, name, password, occupation, confirmPassword } = user;
        const invalidInput = createFirstUserErrorHandler({
            regusername: username,
            name,
            occupation,
            regpassword: password,
            confirmPassword
        });
        const passMismatch = passMisMatchHandle(password, confirmPassword);

        if (!invalidInput && !passMismatch) {
            const response = await axios.post(`${API_URL}/users/register/first`, { ...user });
            if (response.status == 201) {
                overlay.parentNode.removeChild(overlay);
                const appData = '{"appInitialized" : true}'
                await fs.writeFileSync('data.json', appData)
                const { data } = response;
                toastNotify(`user created successfully.`, 'success');
                return data;
            }
        }
    });
}