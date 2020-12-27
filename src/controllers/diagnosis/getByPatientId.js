const getByPatientId = require("../../usecases/diagnosis/getByPatientId");

module.exports = function makeGetByPatientId({getDiagnosisByPatientId}){

    return async function getByPatientId(patientId)
    {
        const diagnosisList = await getDiagnosisByPatientId(patientId);

        return diagnosisList;
    }

}