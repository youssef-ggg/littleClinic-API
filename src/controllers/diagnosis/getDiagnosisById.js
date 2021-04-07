module.exports = function makeGetDiagnosisById({getDiagnosis,jwtVerifyToken}){

    return async function getDiagnosisById(httpRequest)
    {
        const headers = {
            'Content-Type':'application/json'
        };

        const verification = jwtVerifyToken(httpRequest);
        if (verification.statusCode == 403)
        {
            return {
                headers,
                ...verification
            }
        }
        
        const diagnosis = await getDiagnosis({id:httpRequest.query.id});

        return {
            headers,
            statusCode:200,
            body:diagnosis
        }
    }

}