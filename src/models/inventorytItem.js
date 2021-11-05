module.exports = function buildMakeInventoryItem() {

    return function makeInventoryItem({
        id,
        name,
        description,
        unitCost = 0,
        quantity = 0,
        reorderQuantity = 0,
        //reorederCost = 0,
        createdOn = Date.now(),
        modifiedOn = Date.now()
        // inventoryValue = unitCost * quantity
    } = {}) {

        if (!name) {
            throw new Error('Inventory Item must have a name')
        }

        if (typeof (unitCost) != 'number') {
            throw new Error('unitCost must be a number!')
        }

        if (typeof (quantity) != 'number') {
            throw new Error('quantity must be a number!')
        }

        if (typeof (reorderQuantity) != 'number') {
            throw new Error('reorderQuantity must be a number!')
        }

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getDescription: () => description,
            getUnitCost: () => unitCost,
            getQuantity: () => quantity,
            getReorderQuantity: ()=>reorderQuantity,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn
        })
    }
}