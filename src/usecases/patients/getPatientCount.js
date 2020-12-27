const patient = require("../../models/patient");

module.exports = function makeGetPatientCount({patientsCollection}){

    return async function getPatientCount(){
        
        const patientCount  = await patientsCollection.numberOfPatients();

        return patientCount;
    }
}