module.exports = function makeListDiagnosisByPatientId({diagnosisCollection}){

    return async function listDiagnosisByPatientId({patientId}){

        return await diagnosisCollection.findByPatientId({patientId}); 
    }
}