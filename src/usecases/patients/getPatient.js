module.exports =function buildGetPatient({patientsCollection}){
     
    return async function getPatientById(id)
    {
        const patient = await patientsCollection.findById({id});    

        return patient;
    }

}