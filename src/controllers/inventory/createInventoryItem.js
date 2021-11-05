module.exports = function makeCreateInventoryItem({ addInventoryItem, jwtVerifyToken }) {

    return async function createInventoryItem(httpRequest) {

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

            const inventoryData = { ...httpRequest.body }

            const inventoryItem = await addInventoryItem(inventoryData)

            return {
                headers,
                statusCode: 201,
                body: inventoryItem
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