function makeRegisterUser({addUser,jwtSignToken}){

    return async function register(httpRequest){
        const headers = {
            'Content-Type':'application/json',
        };
        try{

            const {source = {},...user} = httpRequest.body;
            
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const registeredUser = await addUser(user);
           
            if(registeredUser.statusCode == 409)
            {
                return {
                    headers,
                    statusCode:registeredUser.statusCode,
                    body:{error:registeredUser.errorMessage}
                }
            }
            const token = jwtSignToken({user});

            return {
                headers,
                statusCode:201,
                body:{registeredUser,token}
            };
        }
        catch(error){
           //TODO:Error Logging
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

module.exports = makeRegisterUser;