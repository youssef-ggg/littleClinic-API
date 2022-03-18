module.exports = function AccessRightErrorHandler({ renderFormError }) {

    function createAccessRightsErrorHandler(accessRightsData) {

        let hasError = false;
        const { accessRightsList, accessRightInput } = accessRightsData
        if (accessRightsList[accessRightInput.userRole]) {
            accessRightsList[accessRightInput.userRole].forEach(accessRight => {
                if (accessRightInput.module == accessRight.module) {
                    hasError = true
                    renderFormError({
                        inputTitle: 'module',
                        message: 'The user role selected already has access to this module.',
                        inputType: 'checkbox'
                    })
                }
            })
        }
        if(!accessRightInput.read){
            hasError=true
            renderFormError({
                inputTitle: 'read',
                message: 'User must at least have read access to a module.',
                inputType: 'checkbox'
            })
        }

        return hasError
    }

    function updateAccessRightsErrorHandler(accessRightsData) {
        let hasError = false;        
        if(!accessRightsData.read){
            hasError=true
            renderFormError({
                inputTitle: 'read',
                message: 'User must at least have read access to a module.',
                inputType: 'checkbox'
            })
        }
        return hasError
    }

    return {
        createAccessRightsErrorHandler,updateAccessRightsErrorHandler
    }
}