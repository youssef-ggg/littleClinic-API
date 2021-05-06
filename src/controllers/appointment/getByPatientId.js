module.exports = function makeGetByPatientId({listAppointmentByPatientId,jwtVerifyToken}){

    return async function getByPatientId(httpRequest)
    {
        const headers = {
            'Content-Type':'application/json'
        };
        const verification = jwtVerifyToken(httpRequest);
        if (verification.statusCode == 403)
        {
            return {
                headers,
                ...verification
            }
        }
        
        const appointmentList = await listAppointmentByPatientId({patientId:httpRequest.query.patientId});
        
        if (appointmentList.length > 0 ){
            return {
                headers,
                statusCode:200,
                body:appointmentList
            };
        }
        else{
            return {
                headers,
                statusCode:404,
                body:{
                    error:'no appointments found.'
                }
            }
        }
        
    }

}