module.exports = function makeInventoryRouter({ routes, makeCallBack, inventoryController }) {

    const {
        createInventoryItem,
        getAllInventoryItems
    } = inventoryController

    routes.post('/inventory/addItem',makeCallBack(createInventoryItem))
    routes.get('/inventory/',makeCallBack(getAllInventoryItems))

    return routes
}