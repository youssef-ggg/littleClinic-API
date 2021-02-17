const validator = require('validator');

const renderFormError = require('./renderFormError');

const makeErrorTnputHandler = require('./checkUserInput');

const {inputErrorHandler,passMisMatchHandle,
    userFormErrorHandler,userFormPassErrorHandle,
    createUserErrorHandler,updateUserDataErrorHandle} = makeErrorTnputHandler({validator,renderFormError});

module.exports = {
    inputErrorHandler,passMisMatchHandle,userFormErrorHandler,userFormPassErrorHandle,
    createUserErrorHandler,updateUserDataErrorHandle
}

