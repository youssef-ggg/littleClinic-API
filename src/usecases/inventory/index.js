const { inventoryCollection } = require('../../dataAcces')
const { addFinancialTransaction } = require('../financialTransaction')

const makeAddInventoryItem = require('./addInventoryItem')
const makeListInventoryItems = require('./listInventoryItems')
const makeFindInventoryItem = require('./findInventoryItem')
const makeListInventoryItemsByField = require('./listInventoryItemsByField')
const MakeEditInventoryItemById = require('./editInventoryItemById')
const makeRemoveInventoryItemById = require('./removeInventoryItemById')

const addInventoryItem = makeAddInventoryItem({ inventoryCollection, addFinancialTransaction })
const listInventoryItems = makeListInventoryItems({ inventoryCollection })
const findInventoryItem = makeFindInventoryItem({ inventoryCollection })
const listInventoryItemByField = makeListInventoryItemsByField({ inventoryCollection })
const editInventoryItemById = MakeEditInventoryItemById({ inventoryCollection })
const removeInventoryItemById = makeRemoveInventoryItemById({ inventoryCollection })

const inventoryServices = Object.freeze({
    addInventoryItem, listInventoryItems, findInventoryItem, listInventoryItemByField, editInventoryItemById,
    removeInventoryItemById
})

module.exports = inventoryServices