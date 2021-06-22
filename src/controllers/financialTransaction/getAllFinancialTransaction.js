module.exports = function makeGetAllFinancialTransaction({listAllFinancialTransaction,jwtVerifyToken}){

    return async function getAllFinancialTransaction(httpRequest){

        const headers = {
            'Content-Type':'application/json'
        }

        try {    
            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403)
            {
                return {
                    headers,
                    ...verification
                }
            }

            const financialTransactions = await listAllFinancialTransaction();

            return {
                headers,
                statusCode:200,
                body:{
                    financialTransactions
                }
            }
        } catch (error) {
            return {
                headers,
                statusCode:400,
                body:{
                    error:error.message
                }
            }
            
        }
    }
}