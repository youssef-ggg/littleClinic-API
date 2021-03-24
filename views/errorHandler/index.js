const validator = require('validator');

const renderFormError = require('./renderFormError');
const commonInputError = require('./commonInputError');

const makeErrorTnputHandler = require('./checkUserInput');
const checkPatientInput = require('./checkPatientInput');

const {
    createPatientErrorHandler,updatePatientErrorHandler
} = checkPatientInput({commonInputError,renderFormError});

const {passMisMatchHandle,
    userFormErrorHandler,userFormPassErrorHandle,createUserErrorHandler,
    updateUserDataErrorHandle,updateUserPasswordErrorHandle
} = makeErrorTnputHandler({validator,renderFormError});

module.exports = {
    passMisMatchHandle,userFormErrorHandler,userFormPassErrorHandle,
    createUserErrorHandler,updateUserDataErrorHandle,updateUserPasswordErrorHandle,
    createPatientErrorHandler,updatePatientErrorHandler
}

