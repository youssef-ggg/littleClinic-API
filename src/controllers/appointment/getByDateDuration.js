module.exports = function makeGetByDateDuration({getByDuration}){

    return async function getByDateDuration({startDate,endDate})
    {
        const appointments = await getByDuration({startDate,endDate});

        return appointments;
    }

}