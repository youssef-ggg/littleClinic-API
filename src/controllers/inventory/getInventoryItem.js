module.exports = function makeGetInventoryItem({ findInventoryItem, jwtVerifyToken }) {

    return async function getInventoryItem(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        const verification = jwtVerifyToken(httpRequest);
        if (verification.statusCode == 403) {
            return {
                headers,
                ...verification
            }
        }
        try {
            const inventoryItem = await findInventoryItem({ id: httpRequest.query.id })

            if (inventoryItem) {
                return {
                    headers,
                    statusCode: 200,
                    body: inventoryItem
                }
            }
            else {

                return {
                    headers,
                    statusCode: 404,
                    body: {
                        error: 'Inventory Item was not found.'

                    }
                }
            }
        } catch (error) {
            //TODO::add error logger
            console.log(error)
        }
    }

}