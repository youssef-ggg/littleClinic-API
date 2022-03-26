module.exports = function makeDeleteAccessRightById({ removeAccessRightById, jwtVerifyToken }) {

    return async function deleteAccessRightById(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403) {
                return {
                    headers,
                    ...verification
                }
            }
            const deleted = await removeAccessRightById({ id: httpRequest.params.id });
            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted }
            }
        } catch (error) {
            // TODO: Error logging
            console.log(error);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: error.message
                }
            }
        }
    }

}