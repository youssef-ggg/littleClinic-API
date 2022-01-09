module.exports = function makeGetAllUsersAccessRights({ findAllUsersAccessRights, jwtVerifyToken }) {

    return async function getAllUsersAccessRights(httpRequest) {
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
            const allUsersAccessRights = await findAllUsersAccessRights()

            return {
                headers,
                statusCode: 200,
                body: allUsersAccessRights
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