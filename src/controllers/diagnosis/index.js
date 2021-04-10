const diagnosisServices = require('../../usecases/diagnosis');
const makeCreateDiagnosis = require('./createDiagnosis');
const makeGetByPatientId = require('./getByPatientId');
const makeGetDiagnosisById = require('./getDiagnosisById');
const makeUpdateDiagnosis = require('./updateDiagnosis');
const makeDeleteSingleDiagnosis = require('./deleteSingleDiagnosis');

const {addDiagnosis,listDiagnosisByPatientId,getDiagnosis,
    editDiagnosis,deleteDiagnosisById} = diagnosisServices;
const {jwtSignToken,jwtVerifyToken} = require('../../jwtAuthorization');

const createDiagnosis = makeCreateDiagnosis({addDiagnosis,jwtVerifyToken});
const getByPatientId = makeGetByPatientId({jwtVerifyToken,listDiagnosisByPatientId});
const getDiagnosisById = makeGetDiagnosisById({getDiagnosis,jwtVerifyToken});
const updateDiagnosis = makeUpdateDiagnosis({editDiagnosis,jwtVerifyToken});
const deleteSingleDiangosis = makeDeleteSingleDiagnosis({deleteDiagnosisById,jwtVerifyToken});



const diagnosisController = Object.freeze({
    createDiagnosis,getByPatientId,getDiagnosisById,updateDiagnosis,
        deleteSingleDiangosis
});

module.exports = diagnosisController;