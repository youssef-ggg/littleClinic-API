module.exports = function makeInventoryRouter({ routes, makeCallBack, inventoryController }) {

    const {
        createInventoryItem,
        getAllInventoryItems,
        getInventoryItem,
        searchInventoryItemByField,
        updateInventoryItemById,
        deleteInventoryItemById
    } = inventoryController

    routes.post('/inventory/addItem', makeCallBack(createInventoryItem))
    routes.get('/inventory/', makeCallBack(getAllInventoryItems))
    routes.get('/inventory/:id', makeCallBack(getInventoryItem))
    routes.get('/inventory/search/byfield', makeCallBack(searchInventoryItemByField))
    routes.patch('/inventory/updateItem/:id', makeCallBack(updateInventoryItemById))
    routes.delete('/inventory/deleteItem/:id', makeCallBack(deleteInventoryItemById))

    return routes
}