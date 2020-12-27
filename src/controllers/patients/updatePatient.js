module.exports = function makeSetUpdatePaitent({updatePatient,jwtVerifyToken}){

    return async function setUpdatePaitent(httpRequest)
    {
        const headers = {
            'Content-Type':'application/json'
        }
        try {
            const {source= {},...patientsInfo} = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if(httpRequest.headers['Referer']){
                source.referrer = httpRequest.headers['Referer']
            }
            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403)
            {
                return {
                    headers,
                    ...verification
                }
            }

            //TODO:change later to add source
            const patientUdpdated = await updatePatient(patientsInfo);
            
            return {
                headers,
                statusCode:200,
                body:{patientUdpdated}
            }

        } catch (error) {
            //TODO:Error Logging
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