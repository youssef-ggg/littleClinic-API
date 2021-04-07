module.exports = function makeGetByPatientId({listDiagnosisByPatientId,jwtVerifyToken}){

    return async function getByPatientId(httpRequest)
    {
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

            const diagnosisLog = await listDiagnosisByPatientId({patientId:httpRequest.query.patientId});
            
            if(diagnosisLog)
            {
                return {
                    headers,
                    statusCode:200,
                    body:diagnosisLog
                }
            }
            else {
                return{
                    headers,
                    statusCode:404,
                    body:{
                        error:'no diagnosis found.'
                    }
                }
            }
            
        } catch (error) {
            //TODO: make error log.
            console.log(error);
            return error;
        }
    }

}