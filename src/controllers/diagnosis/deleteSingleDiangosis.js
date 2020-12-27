module.exports = function makeDeleteSingleDiagnosis({deleteDiagnosisById}){

    return async function deleteSingleDiagnosis(diagnosisInfo)
    {
        const result = await deleteDiagnosisById(diagnosisInfo);

        return result;
    }

}