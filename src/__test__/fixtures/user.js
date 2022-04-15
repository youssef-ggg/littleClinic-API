const faker = require('faker')

module.exports = function makeFakeUser(overrides) {

    const user = {
        username: faker.internet.userName(),
        name: faker.name.findName(),
        password: '12345678',
        occupation: 'general-staff',
        accessRights: 'visitor',
        createdOn: Date.now(),
        modifiedOn: Date.now(),
    }

    return {
        ...user,
        ...overrides
    }
}
