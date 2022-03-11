const faker = require('faker')
module.exports = function makeFakeAccessRight(overrides) {

    const accessRight = {
        module: faker.name.title(),
        userRole: faker.name.title(),
        read: true,
        create: faker.random.boolean(),
        write: faker.random.boolean(),
        remove: faker.random.boolean(),
        createdOn: Date.now(),
        modifiedOn: Date.now()
    }

    return {
        ...accessRight,
        ...overrides
    }
}