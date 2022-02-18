const { inventoryCollection } = require('../../dataAcces')
const { addFinancialTransaction } = require('../financialTransaction')

const makeAddInventoryItem = require('./addInventoryItem')
const makeListInventoryItems = require('./listInventoryItems')
const makeFindInventoryItem = require('./findInventoryItem')
const makeListInventoryItemsByField = require('./listInventoryItemsByField')

const addInventoryItem = makeAddInventoryItem({ inventoryCollection, addFinancialTransaction })
const listInventoryItems = makeListInventoryItems({ inventoryCollection })
const findInventoryItem = makeFindInventoryItem({ inventoryCollection })
const listInventoryItemByField = makeListInventoryItemsByField({ inventoryCollection })

const inventoryServices = Object.freeze({
    addInventoryItem, listInventoryItems, findInventoryItem, listInventoryItemByField
})

module.exports = inventoryServices