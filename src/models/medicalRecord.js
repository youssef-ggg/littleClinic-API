module.exports = function buildMakeMedicalRecord(){

    return function makeMedicalRecord({
        userID,
        basicInfo,
        currentMedication,
        problems,
        pastMedicalHistory,
        allergies,
        familyHistory,
        socialHistory
    }={}){

        return Object.freeze({
            getUserID:()=>userID,
            getBasicInfo:()=>basicInfo,
            getCurrentMedication:()=>currentMedication,
            getProblems:()=>problems,
            getPastMedicalHistory:()=>pastMedicalHistory,
            getAllergies:()=>allergies,
            getFamilyHistory:()=>familyHistory,
            getSocialHistory:()=>socialHistory
        });
    }
}