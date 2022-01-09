module.exports = function makeGetAllRoles({ findAllRoles, jwtVerifyToken }) {

    return async function getAllRoles(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        }
        try {
            const verification = jwtVerifyToken(httpRequest)
            if (verification.statusCode == 403) {
                return {
                    headers,
                    ...verification
                }
            }
            const allRoles = await findAllRoles()

            return {
                headers,
                statusCode: 200,
                body: allRoles
            }
        } catch (error) {
            //TODO add error log
            console.log(error);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: error.message,
                }
            }

        }
    }
}