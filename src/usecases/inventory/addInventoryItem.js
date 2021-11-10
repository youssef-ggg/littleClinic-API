const { makeInventoryItem } = require('../../models')

module.exports = function makeAddInventoryItem({ inventoryCollection, addFinancialTransaction }) {

    return async function addInventoryItem(inventoryItemInfo) {

        const inventoryItem = makeInventoryItem(inventoryItemInfo)

        try {
            if (inventoryItemInfo.makeTransaction) {
                await addFinancialTransaction({
                    description: `Purchase ${inventoryItem.getName()}`,
                    date: Date.now(),
                    amount: inventoryItem.getQuantity() * inventoryItem.getUnitCost(),
                    cashFlow: 'Cash Out',
                    type: 'equipment'
                })
            }
            return inventoryCollection.insert({
                name: inventoryItem.getName(),
                description: inventoryItem.getDescription(),
                unitCost: inventoryItem.getUnitCost(),
                quantity: inventoryItem.getQuantity(),
                reorderQuantity: inventoryItem.getReorderQuantity(),
                createdOn: inventoryItem.getCreatedOn(),
                modifiedOn: inventoryItem.getModifiedOn(),

            })
        } catch (error) {
            console.log(error)
            return error
        }

    }
}