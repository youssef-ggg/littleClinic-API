const faker = require('faker');


module.exports = function makeFakeInventoryItem(overrides){
    const inentoryItem = {
        name : faker.name.findName(),
        description: faker.random.words(),
        unitCost : faker.finance.amount(),
        quantity: faker.random.number(100),
        reorderQuantity : faker.random.number(50),
        createdOn : Date.now(),
        modifiedOn : Date.now(),
    }

    return {
        ...inentoryItem,
        ...overrides
    }
}