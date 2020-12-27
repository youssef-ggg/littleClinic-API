const {diagnosisCollection} = require('../../dataAcces');
const makeAddDiagnosis = require('./addDiagnosis');
const makeGetDiagnosisByPatientId = require('./getByPatientId');
const makeGetDiagnosis = require('./getDiagnosis');
const makeUpdateDiagnosis = require('./udpateDiagnosis');
const makeDeleteDiagnosisById = require('./deleteDiagnosisById');

const addDiagnosis = makeAddDiagnosis({diagnosisCollection});
const getDiagnosisByPatientId = makeGetDiagnosisByPatientId({diagnosisCollection});
const getDiagnosis = makeGetDiagnosis({diagnosisCollection});
const updateDiagnosis = makeUpdateDiagnosis({diagnosisCollection});
const deleteDiagnosisById = makeDeleteDiagnosisById({diagnosisCollection});

const diagnosisServices = Object.freeze({
    addDiagnosis,getDiagnosisByPatientId,getDiagnosis,updateDiagnosis,
        deleteDiagnosisById
});

 module.exports = diagnosisServices;