module.exports = function buildMakeMedicalRecord(){

    return function makeMedicalRecord({
        id,
        userID,
        basicInfo,
        currentMedication,
        problems,
        pastMedicalHistory,
        allergies,
        familyHistory,
        socialHistory
    }={}){

        if(!userID){
            throw new Error('medical record must have a patient id.');
        }

        return Object.freeze({
            getID:()=>id,
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