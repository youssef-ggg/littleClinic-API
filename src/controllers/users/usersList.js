module.exports =  function makeUsersList({usersList,jwtVerifyToken}){

    return async function getUsersList(httpRequest){
        const headers = {
            'Content-Type':'application/json'
        };
        try {
             
            const verification = jwtVerifyToken(httpRequest);
            if (verification.statusCode == 403)
            {
                return {
                    headers,
                    ...verification
                }
            }

            const users = await usersList();
            return {
                headers,
                statusCode:200,
                body:users,
            }

        } catch (error) {
            //TODO:Error Logging
            console.log(error);
            return{
                headers,
                statusCode:400,
                body:{
                    error:error.message,
                }
            }
        }
    }
}