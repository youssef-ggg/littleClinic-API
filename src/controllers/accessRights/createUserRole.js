
module.exports = function makeCreateUserRole({ addUserRole, jwtVerifyToken }) {

    return async function createUseruserRole(httpRequest) {
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

            const { ...userRoleData } = httpRequest.body
            const userRole = await addUserRole(userRoleData)

            return {
                headers,
                statusCode: 201,
                body: userRole
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