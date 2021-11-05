module.exports = function makeListInventoryItems({inventoryCollection}){

    return async function listInventoryItems(){

        return await inventoryCollection.findAll();
    }

}