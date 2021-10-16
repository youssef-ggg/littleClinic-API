module.exports = function makeBalanceTransactionCollection({ makeDb, ObjectID }) {
    return Object.freeze({
        insert,
        findAll,
        // findById,
        findByMonth,
        // findByDay,
        findLatestBalances,
        update,
        // removeById

    })

    async function insert(balanceTransaction) {
        const db = await makeDb()
        const result = await db.collection('balanceTransaction').insertOne(balanceTransaction)
        const insertedInfo = result.ops[0]
        const { _id, ...insertedTranaction } = insertedInfo
        return { id: _id.toString(), ...insertedTranaction }
    }

    async function findAll() {
        const db = await makeDb();
        const result = await db.collection('balanceTransaction').find()
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        })
        )
    }

    async function findLatestBalances() {

        const db = await makeDb()
        const result = await db.collection('balanceTransaction').find({}).sort({ date: -1 }).limit(2)

        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        }))
    }

    async function findByMonth({ month, year }) {

        const lastDayOfMonth = new Date(year, month , 1).getTime()
        const db = await makeDb()
        const result = await db.collection('balanceTransaction').find({
            date: { $lt: lastDayOfMonth }
        }).sort({ date: -1 }).limit(2)

        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        }))
    }

    async function update(updateBalanceData) {
        const db = await makeDb()
        const { id, ...setNewBalance } = updateBalanceData
        const options = { returnOriginal: false }
        const result = await db.collection('balanceTransaction').findOneAndUpdate({ _id: ObjectID(id) },
            {
                $set: { ...setNewBalance },

            },
            options
        )

        const { value } = result
        const { _id, ...rest } = value
        return { id: _id.toString(), ...rest }
    }


}