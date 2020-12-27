module.exports = function makeCreateDiagnosis({addDiagnosis}){

    return async function createDiagnosis(diagnosisInfo){
        const diagnosis = diagnosisInfo ;

        try{
            const createdDiagnosis = await addDiagnosis(diagnosis);
            return createdDiagnosis;
        }
        catch(error){
           return error;
        }
        

    }
}
