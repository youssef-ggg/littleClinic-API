function BuildMakeUser({hashPassword})
{
    return function makeUser({
        id,
        username,
        password,
        hashedPassword,
        name,
        occupation = 'general-staff',
        createdOn = Date.now(),
        modifiedOn = Date.now(),
        accessRights = ['visitor'],

    }={}){
        
        return Object.freeze({
           getId:()=> id,
           getUserName:()=>username,
           getHashedPassword:()=>hashedPassword || hashPassword(password),//hashPassword() returns promise
           getName:()=>name,
           getOccupation:()=>occupation,
           getCreateOn:()=>createdOn,
           getModifiedOn:()=>modifiedOn,
           getAccessRights:()=>accessRights,
        });

    }
    
}

module.exports = BuildMakeUser;