module.exports = function makeGetAllInventoryItems({ listInventoryItems, jwtVerifyToken }) {

    return async function getInventoryItems(httpRequest) {

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
            const inventoryItems = await listInventoryItems()

            return {
                headers,
                statusCode: 201,
                body: inventoryItems
            }
        } catch (error) {
            //TODO: make error logger
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