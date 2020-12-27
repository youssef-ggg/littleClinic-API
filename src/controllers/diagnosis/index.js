const diagnosisServices = require('../../usecases/diagnosis');
const makeCreateDiagnosis = require('./createDiagnosis');
const makeGetByPatientId = require('./getByPatientId');
const makeGetDiagnosisById = require('./getDiagnosisById');
const makeSetUpdateDiagnosis = require('./updateDiagnosis');
const makeDeleteSingleDiagnosis = require('./deleteSingleDiangosis');

const {addDiagnosis,getDiagnosisByPatientId,getDiagnosis,
    updateDiagnosis,deleteDiagnosisById} = diagnosisServices;

const createDiagnosis = makeCreateDiagnosis({addDiagnosis});
const getByPatientId = makeGetByPatientId({getDiagnosisByPatientId});
const getDiagnosisById = makeGetDiagnosisById({getDiagnosis});
const setUpdateDiagnosis = makeSetUpdateDiagnosis({updateDiagnosis});
const deleteSingleDiangosis = makeDeleteSingleDiagnosis({deleteDiagnosisById});

const diagnosisController = Object.freeze({
    createDiagnosis,getByPatientId,getDiagnosisById,setUpdateDiagnosis,
        deleteSingleDiangosis
});

module.exports = diagnosisController;