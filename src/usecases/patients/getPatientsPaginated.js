module.exports =function makeGetPatientsPaginated({patientsCollection}){
     
    return async function getPatientsPaginated(pageNum,pageSize)
    {
        const patients = await patientsCollection.findPaginated({pageNum,pageSize});
        return patients;
    }

}