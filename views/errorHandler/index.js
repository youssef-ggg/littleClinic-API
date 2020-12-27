const validator = require('validator');

const makeErrorTnputHandler = require('./checkUserInput');

const {inputErrorHandler,passMisMatchHandle,existsError,
    userFormErrorHandler,existingUsernameForm} = makeErrorTnputHandler({validator});

module.exports = {
    inputErrorHandler,passMisMatchHandle,existsError,userFormErrorHandler,existingUsernameForm
}

