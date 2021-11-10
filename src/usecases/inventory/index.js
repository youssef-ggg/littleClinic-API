const { inventoryCollection } = require('../../dataAcces')
const { addFinancialTransaction } = require('../financialTransaction')

const makeAddInventoryItem = require('./addInventoryItem')
const makeListInventoryItems = require('./listInventoryItems')

const addInventoryItem = makeAddInventoryItem({ inventoryCollection, addFinancialTransaction })
const listInventoryItems = makeListInventoryItems({ inventoryCollection })

const inventoryServices = Object.freeze({
    addInventoryItem, listInventoryItems
})

module.exports = inventoryServices