const innventoryServices = require('../../usecases/inventory')

const makeCreateInventoryItem = require('./createInventoryItem')
const makeGetAllInventoryItems = require('./getAllInventoryItems')

const { jwtSignToken, jwtVerifyToken } = require('../../jwtAuthorization')


const { addInventoryItem, listInventoryItems } = innventoryServices


const createInventoryItem = makeCreateInventoryItem({ addInventoryItem, jwtVerifyToken })
const getAllInventoryItems = makeGetAllInventoryItems({listInventoryItems,jwtVerifyToken})

const inventoryController = Object.freeze({
    createInventoryItem,getAllInventoryItems
})

module.exports = inventoryController