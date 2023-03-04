//needs refactoring
module.exports = function makeErrorTnputHandler({ validator, renderFormError }) {

    function inputErrorHandler(inputObj) {

        const inputArray = Object.entries(inputObj);
        let hasError = false;
        for ([key, value] of inputArray) {

            if (validator.isEmpty(value)) {
                hasError = true;
                document.querySelector(`.input-container input[name="${key}"]`)
                    .parentElement.setAttribute('data-error', `Must have a ${key}!`);
            }
            else if (!validator.matches(value, "^[a-zA-Z0-9_]*$")) {
                hasError = true;
                document.querySelector(`.input-container input[name="${key}"]`)
                    .parentElement.setAttribute('data-error', `Invalid ${key}!`);
            }
        }
        return hasError;
    }

    function passMisMatchHandle(password, confirmPassword) {

        const passInpt = document
            .querySelector('.input-container input[name="password"]').parentElement;
        const confPassInptD = document
            .querySelector('.input-container input[name="confirmPassword"]').parentElement;


        if (password == '') {
            renderFormError({
                inputTitle: 'password',
                message: 'Must hava a password', inputType: 'text'
            });
            return true;
        }
        else if (password.length < 8) {
            renderFormError({
                inputTitle: 'password',
                message: 'password at least 8 characters!', inputType: 'text'
            });
            return true;
        }
        else if (password !== confirmPassword) {
            confirmPassword.setAttribute('data-error', 'Please make sure your passwords match!');
            return true;
        }
        return false;
    }

    function createFirstUserErrorHandler(userData) {
        let hasError = false;
        const usernameRegexp = /^[a-zA-z._-][a-zA-z0-9._-]*$/;

        if (!userData.regusername.match(usernameRegexp)) {
            hasError = true;
            renderFormError({
                inputTitle: 'regusername',
                message: 'Invalid charachters used.', inputType: 'text'
            });
        }
        if (userFormFirstErrorHandler(userData)) {
            hasError = true;
        }
        if (firstUserFromPassErrorHandler(userData)) {
            hasError = true;
        }
        return hasError;
    }
    function createUserErrorHandler(userData, userExists) {
        let hasError = false;
        const usernameRegexp = /^[a-zA-z._-][a-zA-z0-9._-]*$/;
        if (userExists) {

            renderFormError({
                inputTitle: 'username',
                message: 'This user name is already taken.', inputType: 'text'
            });
            hasError = true;
        }

        if (!userData.username.match(usernameRegexp)) {
            hasError = true;
            renderFormError({
                inputTitle: 'username',
                message: 'Invalid charachters used.', inputType: 'text'
            });
        }
        if (userFormErrorHandler(userData)) {
            hasError = true;
        }
        if (userFormPassErrorHandle(userData)) {
            hasError = true;
        }
        return hasError;
    }

    function userFormFirstErrorHandler(userData){
        const { confirmPassword, accessRights, ...userTextData } = userData;
        let hasError = false;
        if (validator.blacklist(userTextData.regusername, ' ').length < 3) {

            renderFormError({
                inputTitle: 'regusername',
                message: 'Username must be at least three characters.', inputType: 'text'
            });
            hasError = true;

        }
        if (!validator.isAlpha(validator.blacklist(userTextData.name, ' '))) {

            renderFormError({
                inputTitle: 'name',
                message: 'Name must only contian letters.', inputType: 'text'
            });
            hasError = true;
        }
        else if (validator.blacklist(userTextData.name, ' ').length < 3) {

            renderFormError({
                inputTitle: 'name',
                message: 'Name must be at least three charachters long.', inputType: 'text'
            });
            hasError = true;
        }
        if (invalidEmptyInputHandler(userTextData)) {
            hasError = true;
        }
        return hasError;
    }

    function userFormErrorHandler(userData) {

        const { confirmPassword, accessRights, ...userTextData } = userData;
        let hasError = false;
        if (validator.blacklist(userTextData.username, ' ').length < 3) {

            renderFormError({
                inputTitle: 'username',
                message: 'Username must be at least three characters.', inputType: 'text'
            });
            hasError = true;

        }
        if (!validator.isAlpha(validator.blacklist(userTextData.name, ' '))) {

            renderFormError({
                inputTitle: 'name',
                message: 'Name must only contian letters.', inputType: 'text'
            });
            hasError = true;
        }
        else if (validator.blacklist(userTextData.name, ' ').length < 3) {

            renderFormError({
                inputTitle: 'name',
                message: 'Name must be at least three charachters long.', inputType: 'text'
            });
            hasError = true;
        }
        if (invalidEmptyInputHandler(userTextData)) {
            hasError = true;
        }
        return hasError;
    }

    function firstUserFromPassErrorHandler(userData){
        const { regpassword, confirmPassword } = userData;
        let hasError = false;

        if (regpassword.length < 8 && regpassword.length > 0) {

            renderFormError({
                inputTitle: 'regpassword',
                message: 'Password must be at least 8 charachters long.', inputType: 'text'
            });

            hasError = true
        }
        if (regpassword !== confirmPassword) {

            renderFormError({
                inputTitle: 'confirmPassword',
                message: 'Password dosen\'t match.', inputType: 'text'
            });
            hasError = true;
        }
        return hasError;
    }

    function userFormPassErrorHandle(userData) {
        const { password, confirmPassword } = userData;
        let hasError = false;

        if (password.length < 8 && password.length > 0) {

            renderFormError({
                inputTitle: 'password',
                message: 'Password must be at least 8 charachters long.', inputType: 'text'
            });

            hasError = true
        }
        if (password !== confirmPassword) {

            renderFormError({
                inputTitle: 'confirmPassword',
                message: 'Password dosen\'t match.', inputType: 'text'
            });
            hasError = true;
        }
        return hasError;
    }

    function invalidEmptyInputHandler(userTextData) {
        let hasError = false;
        for (const [key, value] of Object.entries(userTextData)) {

            if (!value || value === "") {

                renderFormError({ inputTitle: key, message: `Must have a ${key}.`, inputType: 'text' });
                hasError = true;
            }
        }

        return hasError;
    }

    function updateUserDataErrorHandle(userData) {
        let hasError = false;
        const { accessRights, ...updatedTextData } = userData;
        const usernameRegex = /^[a-zA-Z0-9.-_]*$/;
        const nameRegex = /^[a-zA-Z .']*$/;
        const occupationRegex = /^[a-zA-Z0-9 '/_/.-]*$/;

        if (invalidEmptyInputHandler(updatedTextData)) {
            hasError = true;
        }
        if (!('accessRights' in userData)) {
            renderFormError({
                inputTitle: 'accessRights',
                message: `can't update to empty access rights.`, inputType: 'textArray'
            });
            hasError = true;
        }
        if (!usernameRegex.test(updatedTextData.username)) {
            renderFormError({
                inputTitle: 'username',
                message: 'username can\'t contian invalid characters.', inputType: 'text'
            });
            hasError = true;
        }
        if (!nameRegex.test(updatedTextData.name)) {
            renderFormError({
                inputTitle: 'name',
                message: 'Name must only contian letters.', inputType: 'text'
            });
            hasError = true;
        }
        if (!occupationRegex.test(updatedTextData.occupation)) {
            renderFormError({
                inputTitle: 'occupation',
                message: 'Occupation can\'t contian Invalid characters.',
                inputType: 'text'
            });
            hasError = true;
        }

        return hasError;

    }

    function updateUserPasswordErrorHandle(userPassData) {
        let hasError = false;

        const { oldPassword, password, confirmPassword } = userPassData;
        if (invalidEmptyInputHandler(userPassData)) {
            hasError = true;
        }
        if (oldPassword == password) {
            renderFormError({
                inputTitle: 'password',
                message: 'New Password must not be equal to old password.', inputType: 'password'
            });

            hasError = true;
        }
        if (password.length < 8 && password.length > 0) {

            renderFormError({
                inputTitle: 'password',
                message: 'Password must be at least 8 charachters long.', inputType: 'password'
            });

            hasError = true
        }
        if (password !== confirmPassword) {

            renderFormError({
                inputTitle: 'confirmPassword',
                message: 'Password dosen\'t match.', inputType: 'password'
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
        updateUserPasswordErrorHandle,
        createUserErrorHandler,
        createFirstUserErrorHandler,
        firstUserFromPassErrorHandler
    });
}