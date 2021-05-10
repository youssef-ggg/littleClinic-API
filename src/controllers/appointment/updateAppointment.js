module.exports = function makeUpdateAppointment({editAppointment,jwtVerifyToken}){

    return async function updateAppointment(httpRequest){
        
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
            const {id} = httpRequest.params;
            const editedAppointmentData = {id,...httpRequest.body};
            
            const appointment = await editAppointment(editedAppointmentData);

            return {
                headers,
                statusCode:201,
                body:appointment
            }

        } catch (error) {
            //TODO: make error logger
            console.log(error)
            if (error.name === 'RangeError') {
                return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 404,
                body: {
                        error: error.message
                    }
                }
            }
            else {
                return {
                    headers,
                    statusCode:400,
                    body:{
                        error:error.message
                    }
                }
            }
        }
    }
}