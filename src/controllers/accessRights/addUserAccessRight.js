
module.exports = function makeCreateUserAccessRights({ addAccessRight, jwtVerifyToken }) {

    return async function createUserAccessRight(httpRequest) {
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

            const { ...accessRightData } = httpRequest.body
            const accessRight = await addAccessRight(accessRightData)

            return {
                headers,
                statusCode:201,
                body:accessRight
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