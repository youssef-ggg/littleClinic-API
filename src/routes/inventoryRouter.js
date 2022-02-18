module.exports = function makeInventoryRouter({ routes, makeCallBack, inventoryController }) {

    const {
        createInventoryItem,
        getAllInventoryItems,
        getInventoryItem,
        searchInventoryItemByField
    } = inventoryController

    routes.post('/inventory/addItem', makeCallBack(createInventoryItem))
    routes.get('/inventory/', makeCallBack(getAllInventoryItems))
    routes.get('/inventory/:id', makeCallBack(getInventoryItem))
    routes.get('/inventory/search/byfield',makeCallBack(searchInventoryItemByField))
    
    return routes
}