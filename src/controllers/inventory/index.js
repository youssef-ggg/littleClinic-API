const innventoryServices = require('../../usecases/inventory')

const makeCreateInventoryItem = require('./createInventoryItem')
const makeGetAllInventoryItems = require('./getAllInventoryItems')
const makeGetInventoryItem = require('./getInventoryItem')

const { jwtSignToken, jwtVerifyToken } = require('../../jwtAuthorization')


const { addInventoryItem, listInventoryItems, findInventoryItem } = innventoryServices


const createInventoryItem = makeCreateInventoryItem({ addInventoryItem, jwtVerifyToken })
const getAllInventoryItems = makeGetAllInventoryItems({ listInventoryItems, jwtVerifyToken })
const getInventoryItem = makeGetInventoryItem({ findInventoryItem, jwtVerifyToken })

const inventoryController = Object.freeze({
    createInventoryItem, getAllInventoryItems, getInventoryItem
})

module.exports = inventoryController