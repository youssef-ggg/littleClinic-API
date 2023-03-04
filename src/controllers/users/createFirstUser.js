module.exports = function makeCreateFirstUser({ addFirstUser }) {

    return async function createFirstUser(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            //TODO:source is not being used here use or remove.
            const { source = {}, ...userData } = httpRequest.body;

            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const createdUser = await addFirstUser(userData);
            if (createdUser.statusCode == 409 || createdUser.statusCode == 400) {
                return {
                    headers,
                    statusCode: createdUser.statusCode,
                    body: { error: createdUser.errorMessage }
                }
            }
            return {
                headers,
                statusCode: 201,
                body: {
                    user: createdUser
                }
            }

        } catch (error) {
            //TODO create error logger
            console.log(error);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: error.message,
                },
            };
        }
    }
}