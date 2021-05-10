const validator = require('validator');

const renderFormError = require('./renderFormError');
const commonInputError = require('./commonInputError');

const makeErrorTnputHandler = require('./checkUserInput');
const checkPatientInput = require('./checkPatientInput');
const diagnosisErrorHandler = require('./checkDiangosisInput');
const appointmentErrorHandler = require('./checkAppointmentInput');

const {
    createPatientErrorHandler,updatePatientErrorHandler
} = checkPatientInput({commonInputError,renderFormError});

const {passMisMatchHandle,
    userFormErrorHandler,userFormPassErrorHandle,createUserErrorHandler,
    updateUserDataErrorHandle,updateUserPasswordErrorHandle
} = makeErrorTnputHandler({validator,renderFormError});

const {
    createDiagnosisErrorHandler,updateDiagnosisErrorHandler
} = diagnosisErrorHandler({renderFormError});

const {
    createAppointmentErrorHandler,updateAppointmentErrorHandler
} = appointmentErrorHandler({commonInputError,renderFormError});

module.exports = {
    passMisMatchHandle,userFormErrorHandler,userFormPassErrorHandle,
    createUserErrorHandler,updateUserDataErrorHandle,updateUserPasswordErrorHandle,
    createPatientErrorHandler,updatePatientErrorHandler,createDiagnosisErrorHandler,
    updateDiagnosisErrorHandler,createAppointmentErrorHandler,updateAppointmentErrorHandler
}

