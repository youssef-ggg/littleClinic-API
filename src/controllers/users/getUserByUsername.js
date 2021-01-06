
module.exports =  function makeGetUserByUsername({userByUsername,jwtVerifyToken}){

    return async function getUserByUsername(httpRequest){
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
        const user =  await userByUsername({username:httpRequest.query.username});
        return {
            headers,
            statusCode:200,
            body:user
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