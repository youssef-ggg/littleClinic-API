module.exports = function makeUpdateUserPass({editUserPassword,jwtVerifyToken}){

    return async function updateUserPass(httpRequest){

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
            const userPasswordData = {id,...httpRequest.body};
            
            const updatedUserPassword = await editUserPassword(userPasswordData);
            return {
                headers,
                statusCode:201,
                body:{
                    user:updatedUserPassword
                }
            }
        } catch (error) {
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