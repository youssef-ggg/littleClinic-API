module.exports = function makeGetByDuration({appointmentCollection}){

    return async function getByDuration({startDate,endDate}){
        

        return await appointmentCollection.findByDateDuration({startDate,endDate});
    }
}