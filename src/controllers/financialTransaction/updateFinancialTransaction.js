module.exports = function makeUpdateFinancialTransaction({editFinancialTransaction,jwtVerifyToken}){

    return async function updateFinancialTransaction(httpRequest){

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
            const {id} = httpRequest.params;
            const {...updateTransactionData} = httpRequest.body;

            
            const updatedTransaction = await editFinancialTransaction({id,...updateTransactionData});

            return {
                headers,
                statusCode:200,
                body:updatedTransaction
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