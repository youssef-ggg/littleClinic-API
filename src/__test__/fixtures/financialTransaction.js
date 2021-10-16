const faker = require('faker');
const { typeEnum } = require('../../utils/enums')

module.exports = function makeFakeTransaction(overrides) {
    const financialTransaction = {
        id: faker.random.uuid(),
        description: faker.random.words(),
        date: faker.date.recent().getTime(),
        amount: faker.finance.amount(),
        cashFlow: faker.random.boolean() ? 'Cash In' : 'Cash Out',
        type: typeEnum[faker.random.number(5)],
        referenceNum: faker.random.number(50),
        createdOn: Date.now(),
        modifiedOn: Date.now(),
    }
    return {
        ...financialTransaction,
        ...overrides
    }
}