module.exports = function makeRemoveInventoryItemById({ inventoryCollection }) {

    return async function removeInventoryItemById(inventoryItemData) {

        return await inventoryCollection.removeById(inventoryItemData)
    }
}
