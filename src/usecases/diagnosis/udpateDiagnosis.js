module.exports = function makeUpdateDiagnosis({diagnosisCollection}){

    return async function updateDiagnosis(updatedDiagnosis){

        return await diagnosisCollection.update(updatedDiagnosis); 
    }
}
 