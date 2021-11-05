const { makeInventoryItem } = require('../../models')

module.exports = function makeAddInventoryItem({ inventoryCollection }) {

    return function addInventoryItem(inventoryItemInfo) {

        const inventoryItem = makeInventoryItem(inventoryItemInfo)

        return inventoryCollection.insert({

            name: inventoryItem.getName(),
            description: inventoryItem.getDescription(),
            unitCost: inventoryItem.getUnitCost(),
            quantity: inventoryItem.getQuantity(),
            reorderQuantity: inventoryItem.getReorderQuantity(),
            createdOn: inventoryItem.getCreatedOn(),
            modifiedOn: inventoryItem.getModifiedOn(),

        })
    }
}