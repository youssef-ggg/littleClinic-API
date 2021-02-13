module.exports = function makeUpdateUser({editUser,jwtVerifyToken}){

    return async function updateUser(httpRequest){
        
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
            const editedUserData = {id,...httpRequest.body};
            const updatedUser = await editUser(editedUserData);
            return {
                headers,
                statusCode:201,
                body:{
                    user:updatedUser
                }
            }
            
        } catch (error) {
            //TODO create error logger
            console.log(error);
            return{
                headers,
                statusCode:400,
                body:{
                    error:error.message,
                },
            };
        }
    }

}