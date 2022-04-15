module.exports = function makeLoginUser({ userByUsername, argon2, jwtSignToken, findUserAccessRights }) {

    return async function loginUser(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const { username, password } = httpRequest.body;
        try {
            const userInfo = await userByUsername({ username });

            if (userInfo) {
                const { hashedPassword, ...user } = userInfo;
                //-----------------------------------change to promise all--------------------------
                const passMatch = await argon2.verify(hashedPassword, password);
                //change that to something better
                const userAccess = await findUserAccessRights({ userRole: userInfo.accessRights })
                //----------------------------------------------------------------------------------
                if (passMatch) {

                    const token = jwtSignToken({ user });
                    return {
                        headers,
                        statusCode: 200,
                        body: { token, user, userAccess }
                    };
                } else {

                    return {
                        headers,
                        statusCode: 401,
                        body: {
                            field: 'password',
                            errorMessage: 'Incorrect Password!'
                        }
                    };
                }
            }
            else {
                return {
                    headers,
                    statusCode: 401,
                    body: {
                        field: 'username',
                        errorMessage: 'Incorrect Username!'
                    }
                };
            }
        }
        catch (error) {
            //TODO:Error Logging
            console.log(error);
            return {
                headers,
                statusCode: 400,
                body: {
                    errorMessage: error.message,
                },
            };
        }
    }
}
