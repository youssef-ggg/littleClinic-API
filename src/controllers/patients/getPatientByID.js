module.exports =  function makeGetPatientByID({getPatient,jwtVerifyToken}){

    return async function getPatienByID(httpRequest){

        const headers = {
            'Content-Type':'application/json'
        };
        try {
            const verification = jwtVerifyToken(httpRequest);
            if(verification.statusCode == 403)
            {
                return{
                    headers,
                    ...verification
                }
            }
            
            const patient  = await getPatient(httpRequest.query.id);
            if(patient && patient.length>0)
            {
                return {
                    headers,
                    statusCode:200,
                    body:{patient:patient[0]}
                }
            }
            else {
                return{
                    headers,
                    statusCode:404,
                    body:{
                        error:'patient not found.'
                    }
                }
            }
        } catch (error) {
            //TODO add error log
            console.log(error);
           
            return{
                headers,
                statusCode:400,
                body:{
                    error:error.message,
                }
            }  
        }
    }
}