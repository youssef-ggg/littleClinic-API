const faker = require('faker');

module.exports = function makeFakeTransaction(overrides){
    const financialTransaction = {
        id:faker.random.uuid(),
        description:faker.random.words(),
        date:faker.date.recent().getTime(),
        amount:faker.finance.amount(),
        cashFlow:faker.random.boolean()?'Cash In':'Cash Out',
        type:faker.random.number(6),
        referenceNum:faker.random.number(50),
        createdOn:Date.now(),
        modifiedOn:Date.now(),
    }
    return {
        ...financialTransaction,
        ...overrides
    }
}