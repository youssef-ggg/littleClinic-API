module.exports = function makeDeleteFinancialTransaction({removeFinancialTransaction,jwtVerifyToken}){

    return async function deleteFinancialTransaction(httpRequest){

        const headers = {
            'Content-Type': 'application/json'
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

            const deleted = await removeFinancialTransaction({id: httpRequest.params.id});
            
            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted }
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