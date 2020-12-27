module.exports = function dashboardUtitltyFunctions(){

    const updateEqualityCheck = (updatedObject,object)=>{
        let objectsequal = true;

        for(key in updatedObject)
        {
            if(JSON.stringify(updatedObject[key]) != JSON.stringify(object[key]))
                objectsequal = false;

        }

        return objectsequal;
        
    }

    return Object.freeze({
        updateEqualityCheck
    });
} 