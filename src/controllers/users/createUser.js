module.exports = function makeCreateUser({addUser,jwtVerifyToken}){

    return async function createUser(httpRequest){
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
            const {source = {},...userData} = httpRequest.body;
           
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const createdUser = await addUser(userData);
            if (createdUser.statusCode == 409)
            {
                return {
                    headers,
                    statusCode:createdUser.statusCode,
                    body:{error:createdUser.errorMessage}
                }
            }

            return {
                headers,
                statusCode:201,
                body:{
                    user:createdUser
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