module.exports = function makeDeleteDiagnosisById({diagnosisCollection}){

    return async function deleteDiagnosisById(diagnosisInfo){

        return await diagnosisCollection.removeById(diagnosisInfo); 
    }
}
 