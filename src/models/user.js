function BuildMakeUser({hashPassword})
{
    return function makeUser({
        _id,
        username,
        password,
        hashedPassword,
        name,
        occupation = 'general-staff',
        createdOn = Date.now(),
        modifiedOn = Date.now(),
        accessRights = ['visitor'],

    }={}){
        if(!name)
            throw new Error('user must have a valid name');
        if (!username)
            throw new Error('user must have a valid username')
        if (name.length<3)
            throw new Error('username must be three or more characters');

        return Object.freeze({
           getId:()=> _id,
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