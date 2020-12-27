module.exports = function makeSetUpdateDiagnosis({updateDiagnosis}){

    return async function setUdpateDiagnosis(updatedDiagnosis)
    {
        const result = await updateDiagnosis(updatedDiagnosis);

        return result;
    }

}