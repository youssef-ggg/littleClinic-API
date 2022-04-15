function BuildMakeUser()
{
    return function makeUser({
        id,
        username,
        hashedPassword,
        name,
        occupation = 'general-staff',
        createdOn = Date.now(),
        modifiedOn = Date.now(),
        accessRights = 'visitor',

    }={}){
        
        return Object.freeze({
           getId:()=> id,
           getUserName:()=>username,
           getHashedPassword:()=>hashedPassword,
           getName:()=>name,
           getOccupation:()=>occupation,
           getCreateOn:()=>createdOn,
           getModifiedOn:()=>modifiedOn,
           getAccessRights:()=>accessRights,
        });

    }
    
}

module.exports = BuildMakeUser;