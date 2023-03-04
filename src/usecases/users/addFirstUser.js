const { makeUser, makeUserRole, makeAccessRight } = require('../../models');
const { modules } = require('../../utils/modules')

module.exports = function makeAddFirstUser({ commonDb, usersCollection, accessRightsCollection, argon2 }) {

    return async function addFirstUser(userInfo) {

        const { username, name, accessRights } = userInfo;
        const usernameRegex = /^[a-zA-Z0-9.-_]*$/;
        const nameRegex = /^[a-zA-Z .']*$/;

        if (!username) {
            throw new Error('user must have a username.');
        }
        else if (username.length < 3) {
            throw new Error('username must be at least three characters.');
        }
        else if (!usernameRegex.test(username)) {
            throw new Error('username must not contain invalid characters.');
        }

        if (!name) {
            throw new Error('user must have a name.');
        }
        else if (name.length < 3) {
            throw new Error('name must be at least three characters.');
        }
        else if (!nameRegex.test(name)) {
            throw new Error('name must not contain invalid characters.');
        }

        try {
            const firstUser = await commonDb.checkCollectionExists({ collectionName: 'users' });
            if (!firstUser) {
                return {
                    statusCode: 400,
                    errorMessage: 'This system already has users!',
                }
            }
            const exists = await usersCollection.findByUserName({ username: userInfo.username });
            //change this section
            if (exists) {
                return {
                    statusCode: 409,
                    errorMessage: 'This user Already Exists',
                }
            }
            const userRole = makeUserRole({ role: accessRights })

            await accessRightsCollection.insertUserRole({
                role: userRole.getrole(),
                createdOn: userRole.getCreatedOn(),
                modifiedOn: userRole.getModifiedOn(),
            })

            modules.forEach(async module => {
                const accessRight = makeAccessRight({
                    module,
                    userRole: userRole.getrole(),
                    read: true,
                    write: true,
                    create: true,
                    remove: true
                });

                await accessRightsCollection.insert({
                    module: accessRight.getModule(),
                    userRole: accessRight.getUserRole(),
                    read: accessRight.getRead(),
                    create: accessRight.getCreate(),
                    write: accessRight.getWrite(),
                    remove: accessRight.getRemove(),
                    createdOn: accessRight.getCreatedOn(),
                    modifiedOn: accessRight.getModifiedOn(),
                })
            })

            const hashedPassword = await argon2.hash(userInfo.password);
            const user = makeUser({ hashedPassword, ...userInfo });

            return usersCollection.insert({
                username: user.getUserName(),
                hashedPassword: user.getHashedPassword(),//Changed dependancy enjection to here
                name: user.getName(),
                occupation: user.getOccupation(),
                createdOn: user.getCreateOn(),
                modifiedOn: user.getModifiedOn(),
                accessRights: user.getAccessRights(),
            });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
