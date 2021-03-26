module.exports = function makeCreateDiagnosis({addDiagnosis,jwtVerifyToken}){

    return async function createDiagnosis(httpRequest){

        const headers = {
            'Content-Type':'application/json'
        }

        try{
            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403)
            {
                return {
                    headers,
                    ...verification
                }
            }
            const {...diagnosisData} = httpRequest.body;
            const diagnosis = await addDiagnosis(diagnosisData);
            if (diagnosis.statusCode == 409)
            {
                return {
                    headers,
                    statusCode:diagnosis.statusCode,
                    body:{error:diagnosis.errorMessage}
                }
            }

            return {
                headers,
                statusCode:201,
                body:diagnosis
            }

        }
        catch(error){
            //TODO: error logger
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
