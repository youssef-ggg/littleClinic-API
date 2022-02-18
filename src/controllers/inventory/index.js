const innventoryServices = require('../../usecases/inventory')

const makeCreateInventoryItem = require('./createInventoryItem')
const makeGetAllInventoryItems = require('./getAllInventoryItems')
const makeGetInventoryItem = require('./getInventoryItem')
const makeSearchInventoryItemByField = require('./searchInventoryItemsByField')

const { jwtSignToken, jwtVerifyToken } = require('../../jwtAuthorization')


const { addInventoryItem, listInventoryItems, findInventoryItem,
    listInventoryItemByField } = innventoryServices


const createInventoryItem = makeCreateInventoryItem({ addInventoryItem, jwtVerifyToken })
const getAllInventoryItems = makeGetAllInventoryItems({ listInventoryItems, jwtVerifyToken })
const getInventoryItem = makeGetInventoryItem({ findInventoryItem, jwtVerifyToken })
const searchInventoryItemByField = makeSearchInventoryItemByField({ listInventoryItemByField, jwtVerifyToken })

const inventoryController = Object.freeze({
    createInventoryItem, getAllInventoryItems, getInventoryItem, searchInventoryItemByField
})

module.exports = inventoryController