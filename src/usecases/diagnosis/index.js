const {diagnosisCollection} = require('../../dataAcces');
const makeAddDiagnosis = require('./addDiagnosis');
const makeListDiagnosisByPatientId = require('./listByPatientId');
const makeGetDiagnosis = require('./getDiagnosis');
const makeUpdateDiagnosis = require('./udpateDiagnosis');
const makeDeleteDiagnosisById = require('./deleteDiagnosisById');

const addDiagnosis = makeAddDiagnosis({diagnosisCollection});
const listDiagnosisByPatientId = makeListDiagnosisByPatientId({diagnosisCollection});
const getDiagnosis = makeGetDiagnosis({diagnosisCollection});
const updateDiagnosis = makeUpdateDiagnosis({diagnosisCollection});
const deleteDiagnosisById = makeDeleteDiagnosisById({diagnosisCollection});

const diagnosisServices = Object.freeze({
    addDiagnosis,listDiagnosisByPatientId,getDiagnosis,updateDiagnosis,
        deleteDiagnosisById
});

 module.exports = diagnosisServices;