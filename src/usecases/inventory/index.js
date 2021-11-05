const { inventoryCollection } = require('../../dataAcces')

const makeAddInventoryItem = require('./addInventoryItem')
const makeListInventoryItems = require('./listInventoryItems')

const addInventoryItem = makeAddInventoryItem({ inventoryCollection })
const listInventoryItems = makeListInventoryItems({ inventoryCollection })

const inventoryServices = Object.freeze({
    addInventoryItem, listInventoryItems
})

module.exports = inventoryServices