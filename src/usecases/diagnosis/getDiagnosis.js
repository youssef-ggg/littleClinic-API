module.exports = function makeGetDiagnosis({diagnosisCollection}){

    return async function getDiagnosis(id){

        return await diagnosisCollection.findById({id}); 
    }
}