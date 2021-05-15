module.exports = function makeListByDuration({appointmentCollection}){

    return async function listByDuration({startDate,endDate}){
        

        return await appointmentCollection.findByDateDuration({startDate,endDate});
    }
}