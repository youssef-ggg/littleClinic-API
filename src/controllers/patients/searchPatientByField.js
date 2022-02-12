module.exports = function makeSearchPatientByField({ listPatientByField, jwtVerifyToken }) {

    return async function searchPatientByField(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        }

        try {

            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403) {
                return {
                    headers,
                    ...verification
                }
            }

            const { fieldName, fieldRegex, caseSensitive } = httpRequest.query;
      
            const patientsList = await listPatientByField({
                fieldName,
                fieldRegex,
                caseSensitive
            });

            return {
                headers,
                statusCode: 200,
                body: patientsList
            }

        } catch (error) {
            //TODO add error log
            console.log(error);
            return {
                headers,
                statusCode: 400,
                body: { error: error.message, }
            }

        }
    }
}