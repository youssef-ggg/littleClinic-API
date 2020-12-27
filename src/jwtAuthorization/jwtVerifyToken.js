module.exports = function makeJwtVerifyToken({jwt})
{
    return function jwtVerifyToken(httpRequest){
       
        const bearerHeader = httpRequest.headers['authorization'];
      
            if(typeof bearerHeader!=='undefined')
            {
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];
                const token = bearerToken;
                const verification = jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(error,user)=>{
                    if (error) {
                        throw new Error(error);
                    }else {
                        
                        return {
                            statusCode:200
                        }
                    }
                });
                return verification;
            }else {
                return {
                    statusCode:403,
                    body:{
                        error:'forbidden.'
                    }
                }
            }
    };
}