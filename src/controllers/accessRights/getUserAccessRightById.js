module.exports = function makeGetUserAccessRightById({ findAccessRightById, jwtVerifyToken }) {

    return async function getUserAccessRightById(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const verification = jwtVerifyToken(httpRequest)
            if (verification.statusCode == 403) {
                return {
                    headers,
                    ...verification
                }
            }

            const userAccessRight = await findAccessRightById({ id: httpRequest.params.id })

            return {
                headers,
                statusCode: 200,
                body: userAccessRight
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