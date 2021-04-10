const {diagnosisCollection} = require('../../dataAcces');
const makeAddDiagnosis = require('./addDiagnosis');
const makeListDiagnosisByPatientId = require('./listByPatientId');
const makeGetDiagnosis = require('./getDiagnosis');
const makeEditDiagnosis = require('./editDiagnosis');
const makeDeleteDiagnosisById = require('./deleteDiagnosisById');

const addDiagnosis = makeAddDiagnosis({diagnosisCollection});
const listDiagnosisByPatientId = makeListDiagnosisByPatientId({diagnosisCollection});
const getDiagnosis = makeGetDiagnosis({diagnosisCollection});
const editDiagnosis = makeEditDiagnosis({diagnosisCollection});
const deleteDiagnosisById = makeDeleteDiagnosisById({diagnosisCollection});

const diagnosisServices = Object.freeze({
    addDiagnosis,listDiagnosisByPatientId,getDiagnosis,editDiagnosis,
        deleteDiagnosisById
});

 module.exports = diagnosisServices;