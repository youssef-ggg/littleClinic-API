const {makeDiagnosis} = require('../../models');

module.exports = function makeAddDiagnosis({diagnosisCollection}){

    return async function addDiagnosis(diagnosisInfo){

        const diagnosis = makeDiagnosis(diagnosisInfo);

        return diagnosisCollection.insert({
            patientId:diagnosis.getpatientId(),
            cheifComplaint:diagnosis.getCheifComplaint(),
            medications:diagnosis.getMedications(),
            treatment:diagnosis.getTreatment(),
            orders:diagnosis.getOrders(),
            problems:diagnosis.getProblems(),
            createdOn:diagnosis.getCreatedOn(),
            modifiedOn:diagnosis.getModifiedOn(),
        });
    }
}