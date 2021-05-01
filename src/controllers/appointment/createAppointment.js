module.exports = function makeCreateAppointment({addAppointment,jwtVerifyToken}){

    return async function createAppointment(httpRequest){

        const headers = {
            'Content-Type':'application/json'
        }

        try {

            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403)
            {
                return {
                    headers,
                    ...verification
                }
            }
            const {...appointmentData} = httpRequest.body;
            const appointment = await addAppointment(appointmentData);
            

            return {
                headers,
                statusCode:201,
                body:appointment
            }
            
        } catch (error) {
            //TODO::error logger
            console.log(error);
            return{
                headers,
                statusCode:400,
                body:{
                    error:error.message,
                },
            };
        }


    }
}