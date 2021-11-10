const validator = require('validator');

const renderFormError = require('./renderFormError');
const commonInputError = require('./commonInputError');

const makeErrorTnputHandler = require('./checkUserInput');
const checkPatientInput = require('./checkPatientInput');
const diagnosisErrorHandler = require('./checkDiangosisInput');
const appointmentErrorHandler = require('./checkAppointmentInput');
const financialTransactionErrorHandler = require('./checkFinancialTransaction');
const inventoryErrorHandler = require('./checkInventoryInput');

const {
    createPatientErrorHandler, updatePatientErrorHandler
} = checkPatientInput({ commonInputError, renderFormError });

const { passMisMatchHandle,
    userFormErrorHandler, userFormPassErrorHandle, createUserErrorHandler,
    updateUserDataErrorHandle, updateUserPasswordErrorHandle
} = makeErrorTnputHandler({ validator, renderFormError });

const {
    createDiagnosisErrorHandler, updateDiagnosisErrorHandler
} = diagnosisErrorHandler({ renderFormError });

const {
    createAppointmentErrorHandler, updateAppointmentErrorHandler
} = appointmentErrorHandler({ commonInputError, renderFormError });

const {
    createTransactionErrorHandler
} = financialTransactionErrorHandler({ commonInputError, renderFormError });

const {
    createInventoryItemErrorHandler
} = inventoryErrorHandler({ commonInputError, renderFormError })
module.exports = {
    passMisMatchHandle, userFormErrorHandler, userFormPassErrorHandle,
    createUserErrorHandler, updateUserDataErrorHandle, updateUserPasswordErrorHandle,
    createPatientErrorHandler, updatePatientErrorHandler, createDiagnosisErrorHandler,
    updateDiagnosisErrorHandler, createAppointmentErrorHandler, updateAppointmentErrorHandler,
    createTransactionErrorHandler, createInventoryItemErrorHandler
}

