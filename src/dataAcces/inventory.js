module.exports = function makeInventoryCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        insert,
        findAll,
    })

    async function insert(inventoryItem) {
        const db = await makeDb()
        const result = await db.collection('inventory').insertOne(inventoryItem)
        const insertedInfo = result.ops[0]
        const { _id, ...insertedInventoryItem } = insertedInfo

        return { id: _id.toString(), ...insertedInventoryItem }
    }

    async function findAll() {
        const db = await makeDb()
        const result = await db.collection('inventory').find()
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        }))
    }
}