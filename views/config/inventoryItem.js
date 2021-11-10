module.exports = Object.freeze({

    inventoryTableFormat(inventoryItemsList) {
        let inventoryItemsTable = []

        inventoryItemsList.forEach(inventoryItem => {
            const { id, name, unitCost, quantity, reorderQuantity } = inventoryItem
            const inventoryValue = unitCost * quantity
            const reorderCost = unitCost * reorderQuantity

            inventoryItemsTable.push({
                id,
                Name: name,
                'Unit Cost': unitCost,
                Quantity: quantity,
                'Inventory Value': inventoryValue,
                'Reorder Quantity': reorderQuantity,
                'Reorder Cost': reorderCost
            })
        })

        return inventoryItemsTable
    },
    inventoryFormFormat: () => [
        {
            label: 'Name',
            id: 'name',
            type: 'text'
        },
        {
            label: "Description",
            id: 'description',
            type: 'text'
        },
        {
            label:'Unit Cost',
            id:'unitCost',
            type:'number'
        },
        {
            label:'Quantity',
            id:'quantity',
            type:'number'
        },
        {
            label:'Reorder Quantity',
            id:'reorderQuantity',
            type:'number'
        },
        {
            label:'Add To Cash Ledger',
            id:'makeTransaction',
            type:'checkbox'
        }
    ]
})