module.exports =function makeListPatientsPaginated({patientsCollection}){
     
    return async function listPatientsPaginated({pageNum,pageSize})
    {
        const patients = await patientsCollection.findPaginated({pageNum,pageSize});
        return patients;
    }

}