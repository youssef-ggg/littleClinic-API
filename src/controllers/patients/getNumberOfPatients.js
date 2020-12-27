module.exports = function makeGetNumberOfPatients({getPatientCount,jwtVerifyToken}){

    return async function getNumberOfPatients(httpRequest){

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
            const numberOfPatients = await getPatientCount();
            return {
                headers,
                statusCode:200,
                body:{numberOfPatients}
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
