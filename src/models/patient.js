module.exports = function buildMakePatient(){

    return function makePatient({
        id,
        name,
        phoneNumber = 0,
        gender,
        birthDate,
        balance = 0,
        numberOfVisits = 0,//used for discounts
        active = true,
        createdOn = Date.now(),
        modifiedOn = Date.now(),
        medicalRecordId
    }={}){
        
        if(!name)
            throw new Error('Patient must have a name.');
        if (name.length<3) 
            throw new Error('Patient name must be at least 3 charachters.');
        if (!gender)
            throw new Error('patient must have a biological gender.');
        if(!birthDate)
            throw new Error('patient must have a birth date.');

        return Object.freeze({
            getId:()=>id,
            getName :()=>name,
            getPhoneNumber:()=>phoneNumber,
            getGender:()=>gender,
            getBirthDate:()=>birthDate,
            getBalance:()=>balance,
            getNumberOfVisits:()=>numberOfVisits,
            getActive:()=>active,
            getCreatedOn:()=>createdOn,
            getModifiedOn:()=>modifiedOn,
            getMedicalRecordID:()=>medicalRecordId
        });
        

    }
}