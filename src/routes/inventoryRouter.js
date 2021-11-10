module.exports = function makeInventoryRouter({ routes, makeCallBack, inventoryController }) {

    const {
        createInventoryItem,
        getAllInventoryItems,
        getInventoryItem
    } = inventoryController

    routes.post('/inventory/addItem', makeCallBack(createInventoryItem))
    routes.get('/inventory/', makeCallBack(getAllInventoryItems))
    routes.get('/inventory/:id', makeCallBack(getInventoryItem))
    
    return routes
}