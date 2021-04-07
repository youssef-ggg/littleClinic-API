const diagnosisServices = require('../../usecases/diagnosis');
const makeCreateDiagnosis = require('./createDiagnosis');
const makeGetByPatientId = require('./getByPatientId');
const makeGetDiagnosisById = require('./getDiagnosisById');
const makeSetUpdateDiagnosis = require('./updateDiagnosis');
const makeDeleteSingleDiagnosis = require('./deleteSingleDiangosis');

const {addDiagnosis,listDiagnosisByPatientId,getDiagnosis,
    updateDiagnosis,deleteDiagnosisById} = diagnosisServices;
const {jwtSignToken,jwtVerifyToken} = require('../../jwtAuthorization');

const createDiagnosis = makeCreateDiagnosis({addDiagnosis,jwtVerifyToken});
const getByPatientId = makeGetByPatientId({jwtVerifyToken,listDiagnosisByPatientId});
const getDiagnosisById = makeGetDiagnosisById({getDiagnosis,jwtVerifyToken});
const setUpdateDiagnosis = makeSetUpdateDiagnosis({updateDiagnosis});
const deleteSingleDiangosis = makeDeleteSingleDiagnosis({deleteDiagnosisById});



const diagnosisController = Object.freeze({
    createDiagnosis,getByPatientId,getDiagnosisById,setUpdateDiagnosis,
        deleteSingleDiangosis
});

module.exports = diagnosisController;