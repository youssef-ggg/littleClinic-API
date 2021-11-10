module.exports = function makeFindInventoryItem({ inventoryCollection }) {

    return function findInventoryItem({ id }) {
        if (!id) {
            throw new Error('You must supply an id.');
        }
        return inventoryCollection.findById({id})
    }
}