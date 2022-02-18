module.exports = function makeListInventoryItemsByField({ inventoryCollection }) {

    return async function listInventoryItemByField({ fieldName, fieldRegex, caseSensitive }) {


        if (typeof (fieldRegex) == 'string') {
            caseSensitive = caseSensitive == 'true' ? true : false

            if (caseSensitive) {
                fieldRegex = new RegExp(fieldRegex)
            } else {
                fieldRegex = new RegExp(fieldRegex, 'i')
            }
        } else {
            throw new Error('fieldRegex must be a regular expresion of type string')
        }
        return inventoryCollection.findByField({ fieldName, fieldRegex })
    }
}