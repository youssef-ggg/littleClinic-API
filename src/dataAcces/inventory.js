module.exports = function makeInventoryCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        insert,
        findById,
        findAll,
        findByField,
        updateById,
        removeById,
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

        const { _id: id, ...info } = found[0]

        return { id: id.toString(), ...info }
    }

    async function findAll() {
        const db = await makeDb()
        const result = await db.collection('inventory').find()
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        }))
    }

    async function findByField({ fieldName, fieldRegex }) {
        const db = await makeDb()
        const findLikeFieldName = {}
        findLikeFieldName[fieldName] = fieldRegex
        const result = await db.collection('inventory').find({
            ...findLikeFieldName
        })

        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        })
        )
    }
    async function updateById(inventoryData) {
        const { id, ...setNewInventoryData } = inventoryData
        const options = { returnOriginal: false }
        const db = await makeDb()
        const result = await db.collection('inventory').findOneAndUpdate({ _id: ObjectID(id) },
            {
                $set: { ...setNewInventoryData }
            },
            options
        )

        const { value } = result
        const { _id, ...rest } = value
        return { id: _id.toString(), ...rest }
    }
    async function removeById(inventroyData) {

        const { id } = inventroyData
        const db = await makeDb()
        const result = await db.collection('inventory').deleteOne({ _id: ObjectID(id) })

        return result
    }
}