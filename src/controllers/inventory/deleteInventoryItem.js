module.exports = function makeDeleteInventoryItemById({ removeInventoryItemById, jwtVerifyToken }) {

    return async function deleteInventoryItemById(httpRequest) {

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

            const deleted = await removeInventoryItemById({ id: httpRequest.params.id });

            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted }
            }
        } catch (error) {
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