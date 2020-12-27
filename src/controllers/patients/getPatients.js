module.exports =  function makeGetPatients({listPatients,jwtVerifyToken}){

    return async function getPatientLists(httpRequest){
        const headers = {
            'Content-Type':'application/json',
        }
        try {
            const verification = jwtVerifyToken(httpRequest);      
            if(verification.statusCode == 403)
            {
                return{
                    headers,
                    ...verification
                }
            }
            const patientsList =  await listPatients();
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
                body:{
                    error:error.message,
                }
            }        
        }
        
    }
}