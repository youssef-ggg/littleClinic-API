module.exports = function makeCreatepatient({addPatient,jwtVerifyToken}){

    return async function createPatient(httpRequest){

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
            const {source={},...patient} =httpRequest.body ;
            
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const createdPatient = await addPatient(patient);
            return {
                headers,
                statusCode:201,
                body:{
                    createdPatient
                }
            };
        }
        catch(error){
           return error;
        }
        

    }
}
