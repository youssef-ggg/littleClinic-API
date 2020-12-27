module.exports = function makeJwtSignToken({jwt}){
    
    return function jwtSignToken({user}){
        
        const key = process.env.ACCESS_TOKEN_KEY ;
        const token = jwt.sign({user}, key);

        return token;
    }
}