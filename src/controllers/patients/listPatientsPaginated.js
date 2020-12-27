module.exports =  function makeListPatientPaginated({getPatientsPaginated}){

    return async function listPatientPaginated(pageNum,PageSize){
        return await getPatientsPaginated(pageNum,PageSize);
    }
}