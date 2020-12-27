module.exports = function makeGetDiagnosisById({getDiagnosis}){

    return async function getDiagnosisById(id)
    {
        const diagnosis = await getDiagnosis(id);

        return diagnosis;
    }

}