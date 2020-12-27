module.exports = function makeGetDiagnosisByPatientId({diagnosisCollection}){

    return async function getDiagnosisByPatientId(patientId){

        return await diagnosisCollection.findByPatientId({patientId}); 
    }
}