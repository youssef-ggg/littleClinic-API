module.exports =  function makeGetPatientsPaginated({listPatientsPaginated,jwtVerifyToken}){

    return async function getPatientsPaginated(httpRequest){

        const headers = {
            'Content-Type':'application/json',
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

            const {pageNum,pageSize}= httpRequest.params;
            const patientsList =  await listPatientsPaginated({
                pageNum:parseInt(pageNum),
                pageSize:parseInt(pageSize)
            });
            
            return {
                headers,
                statusCode:200,
                body:patientsList
            }
            
        } catch (error) {
            //TODO add error log
            console.log(error);
            return{
                headers,
                statusCode:400,
                body:{error:error.message,}
            }

        }

    }
}