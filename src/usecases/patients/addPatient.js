const {makePatient} = require('../../models');

module.exports = function makeAddPatient({patientsCollection}){

    return async function addPatient(patientInfo){

        const patient = makePatient(patientInfo);

        return patientsCollection.insert({
            name:patient.getName(),
            phoneNumber:patient.getPhoneNumber(),
            gender:patient.getGender(),
            birthDate:patient.getBirthDate(),
            balance:patient.getBalance(),
            totalExpenses:patient.getTotalExpensis(),
            active:patient.getActive(),
            createdOn:patient.getCreatedOn(),
            modifiedOn:patient.getModifiedOn(),
        });
    }
}