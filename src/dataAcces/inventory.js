module.exports = function makeInventoryCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        insert,
        findById,
        findAll,
    })

    async function insert(inventoryItem) {
        const db = await makeDb()
        const result = await db.collection('inventory').insertOne(inventoryItem)
        const insertedInfo = result.ops[0]
        const { _id, ...insertedInventoryItem } = insertedInfo

        return { id: _id.toString(), ...insertedInventoryItem }
    }

    async function findById({ id: _id }) {

        const db = await makeDb()
        const result = await db.collection('inventory').find({ _id: ObjectID(_id) })
        const found = await result.toArray()

        if (found.length === 0)
            return null

        const {_id:id,...info} = found[0]

        return {id:id.toString(),...info}
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