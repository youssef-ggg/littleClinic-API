module.exports = function makeGetByDateDuration({listByDuration,jwtVerifyToken}){

    return async function getByDateDuration(httpRequest)
    {
        const headers = {
            'Content-Type':'application/json'
        }
    
        try {
            
            const {startDate,endDate} = httpRequest.query;
            const startDateFormat = new Date(parseInt(startDate));
            const endDateFormat = new Date(parseInt(endDate));
            const appointmentList = await listByDuration({startDate:startDateFormat,endDate:endDateFormat});
            const verification = jwtVerifyToken(httpRequest);
            
            if (verification.statusCode == 403)
            {
                return {
                    headers,
                    ...verification
                }
            }

            return {
                headers,
                statusCode:200,
                body:appointmentList
            };
        
        } catch (error) {
            //TODO::error logger
            console.log(error);
            return{
                headers,
                statusCode:400,
                body:{
                    error:error.message,
                },
            }
        }
    }

}