const innventoryServices = require('../../usecases/inventory')

const makeCreateInventoryItem = require('./createInventoryItem')
const makeGetAllInventoryItems = require('./getAllInventoryItems')
const makeGetInventoryItem = require('./getInventoryItem')
const makeSearchInventoryItemByField = require('./searchInventoryItemsByField')
const makeUpdateInventroyItemById = require('./updateInventoryItem')
const makeDeleteInventoryItemById = require('./deleteInventoryItem')

const { jwtSignToken, jwtVerifyToken } = require('../../jwtAuthorization')


const { addInventoryItem, listInventoryItems, findInventoryItem,
    listInventoryItemByField, editInventoryItemById, removeInventoryItemById } = innventoryServices


const createInventoryItem = makeCreateInventoryItem({ addInventoryItem, jwtVerifyToken })
const getAllInventoryItems = makeGetAllInventoryItems({ listInventoryItems, jwtVerifyToken })
const getInventoryItem = makeGetInventoryItem({ findInventoryItem, jwtVerifyToken })
const searchInventoryItemByField = makeSearchInventoryItemByField({ listInventoryItemByField, jwtVerifyToken })
const updateInventoryItemById = makeUpdateInventroyItemById({ editInventoryItemById, jwtVerifyToken })
const deleteInventoryItemById = makeDeleteInventoryItemById({ removeInventoryItemById, jwtVerifyToken })

const inventoryController = Object.freeze({
    createInventoryItem, getAllInventoryItems, getInventoryItem, searchInventoryItemByField,
    updateInventoryItemById, deleteInventoryItemById
})

module.exports = inventoryController