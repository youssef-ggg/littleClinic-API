module.exports = function makeUpdateDiagnosis({editDiagnosis,jwtVerifyToken}){

    return async function updateDiagnosis(httpRequest){

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
            const editedDiagnosisData = {id,...httpRequest.body};
            const diagnosis = await editDiagnosis(editedDiagnosisData);
           
            return {
                headers,
                statusCode:201,
                body:diagnosis
            }
        
        } catch (error) {
        //TODO: make error logger
        console.log(error.message);
            return {
                headers,
                statusCode:400,
                body:{
                    error:error.message
                }
            }
        }
        // 
    }

}