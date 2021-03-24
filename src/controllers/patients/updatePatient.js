module.exports = function makeUpdatePatient({editPatient,jwtVerifyToken}){

    return async function updatePatient(httpRequest)
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

            const {id} = httpRequest.params
            //TODO:change later to add source
            const patient = await editPatient({id,...patientsInfo});
            
            return {
                headers,
                statusCode:201,
                body:patient
            }

        } catch (error) {
            //TODO:Error Logging
            console.log(error);
            if (error.name == 'RangeError'){
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