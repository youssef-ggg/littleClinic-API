module.exports = function makeGetFinancialTransactionById({findFinancialTransaction,jwtVerifyToken}){
    
    return async function getFinancialTransactionById(httpRequest){

        const headers = {
            'Content-Type':'application/json'
        }

        try {
            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403){

                return {
                    headers,
                    ...verification
                }
            }

            const {id} = httpRequest.params;
            const financialTransaction = await findFinancialTransaction({id});
            
            return {
                headers,
                statusCode:200,
                body:{financialTransaction}
            }

        } catch (error) {
            //TODO:build error logger
            return {
                headers,
                statusCode:400,
                body:{
                    error:error.message
                }
            };
        }
        
    }
}