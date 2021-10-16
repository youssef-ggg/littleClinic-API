const faker = require('faker');

// overrides {balanceTransaction.type = number}
module.exports = function makeFakeBalanceTransaction(overrides){

    const type = faker.random.word()
    const balanceTransaction = {
        id:faker.random.uuid(),
        description:faker.random.boolean()?'Opening Balance':'Closing Balance',
        investment:faker.finance.amount(),
        revenue:faker.finance.amount(),
        other:faker.finance.amount(),
        wages:faker.finance.amount(),
        equipment:faker.finance.amount(),
        marketing:faker.finance.amount(),
        date:faker.date.recent().getTime(),
        createdOn:Date.now(),
        modifiedOn:Date.now(),
    }
    return {
        ...balanceTransaction,
        ...overrides
    }
}