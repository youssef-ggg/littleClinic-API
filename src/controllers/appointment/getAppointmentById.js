module.exports = function makeGetAppointmentById({getAppointment,jwtVerifyToken}){

    return async function getAppointmentById(httpRequest)
    {
        const headers = {
            'Content-Type':'application/json'
        }

        const verification = jwtVerifyToken(httpRequest);
        if (verification.statusCode == 403)
        {
            return {
                headers,
                ...verification
            }
        }
        const appointment = await getAppointment({id:httpRequest.query.id});

        if (appointment){
            return {
                headers,
                statusCode:200,
                body:appointment
            };
        }
        else {
            return {
                headers,
                statusCode:404,
                body:{
                    error:'appointment was not found.'
                }
            }
        }
        
    }

}