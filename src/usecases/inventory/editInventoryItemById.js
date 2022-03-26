const { makeInventoryItem } = require('../../models')

module.exports = function MakeEditInventoryItemById({ inventoryCollection }) {

    return async function editInventoryItemById(updatedInventoryItem) {

        const existing = await inventoryCollection.findById({ id: updatedInventoryItem.id })
        if (!existing) {
            throw new RangeError('Inventory item not found.')
        }

        const inventoryItem = makeInventoryItem(updatedInventoryItem)

        return await inventoryCollection.updateById({
            id: inventoryItem.getId(),
            name: inventoryItem.getName(),
            description: inventoryItem.getDescription(),
            unitCost: inventoryItem.getUnitCost(),
            quantity: inventoryItem.getQuantity(),
            reorderQuantity: inventoryItem.getReorderQuantity(),
            modifiedOn: inventoryItem.getModifiedOn(),
        })

    }
}