module.exports = function makeUpdateInventroyItemById({ editInventoryItemById, jwtVerifyToken }) {

    return async function updateInventroyItemById(httpRequest) {

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
            const { id } = httpRequest.params
            const editedInventoryData = { id, ...httpRequest.body }

            const inventoryItem = await editInventoryItemById(editedInventoryData)

            return {
                headers,
                statusCode: 201,
                body: inventoryItem
            }

        } catch (error) {
            //TODO: make error logger
            console.log(error)
            if (error.name === 'RangeError') {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 404,
                    body: {
                        error: error.message
                    }
                }
            }
            else {
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
}