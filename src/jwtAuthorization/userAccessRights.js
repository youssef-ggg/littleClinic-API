module.exports = function makeCheckAccessRights({ findAccessRight }) {

    return async function checkAccessRights({ module, roles, method }) {

        const userRoles = roles.split(',')

        for (const userRole of userRoles) {
            const accessExists = await findAccessRight({ module, userRole })
            if (accessExists) {
                if (method === 'GET' && accessExists['read']) {
                    return true
                }
                else if (method === 'POST' && accessExists['create']) {
                    return true
                }
                else if (method === 'PUT' && accessExists['write']) {
                    return true
                }
                else if (method === 'DELETE' && accessExists['remove']) {
                    return true
                }

            }
        }
        return false

    }

}