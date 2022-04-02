
module.exports = function makeCreateFinancialTransaction({ addFinancialTransaction, jwtVerifyToken }) {

    return async function createFinancialTransaction(httpRequest) {

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


            const transactionData = { ...httpRequest.body };

            const financialTransaction = await addFinancialTransaction(transactionData);
            return {
                headers,
                statusCode: 201,
                body: financialTransaction
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