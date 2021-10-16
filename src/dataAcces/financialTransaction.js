module.exports = function makeTransactionCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        insert,
        findAll,
        findById,
        findByMonth,
        findByDay,
        update,
        removeById
    });

    async function insert(financialTransaction) {

        try {
            const db = await makeDb();
            const result = await db.collection('financialTransaction').insertOne(financialTransaction);
            const insertedInfo = result.ops[0];
            const { _id, ...insertedTranaction } = insertedInfo;
            return { id: _id.toString(), ...insertedTranaction };
        } catch (error) {
            return error;
        }
    }

    async function findAll() {
        try {
            const db = await makeDb();
            const result = await db.collection('financialTransaction').find();
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id: id.toString(),
                ...found
            })
            );
        } catch (error) {
            return error;
        }
    }

    async function findById({ id: _id }) {
        try {
            const db = await makeDb();
            const result = await db.collection('financialTransaction').find({ _id: ObjectID(_id) });
            const found = await result.toArray();
            if (found.length === 0)
                return null;

            const { _id: id, ...info } = found[0];
            return { id: id.toString(), ...info };

        } catch (error) {
            return error;
        }
    }

    async function findByMonth({ month, year }) {
        try {
            const startDayMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
            const endDayMonth = new Date(year, month, 0, 23, 59, 59, 999);

            const db = await makeDb();
            const result = await db.collection('financialTransaction').find({
                date: { $gte: startDayMonth.getTime(), $lte: endDayMonth.getTime() }
            });
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id: id.toString(),
                ...found
            }));
        } catch (error) {
            return error;
        }
    }

    async function findByDay({ day, month, year }) {

        const startDay = new Date(year, month, day, 0, 0, 0, 0)
        const endDay = new Date(year, month, day, 23, 59, 59, 999)

        const db = await makeDb()
        const result = await db.collection('financialTransaction').find({
            date: { $gte: startDay.getTime(), $lte: endDay.getTime() }
        })
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        }))
    }

    async function update(financialTransactionData) {

        const { id, ...setNewTransaction } = financialTransactionData;
        const options = { returnOriginal: false };
        try {
            const db = await makeDb();
            const result = await db.collection('financialTransaction').findOneAndUpdate({ _id: ObjectID(id) },
                {
                    $set: { ...setNewTransaction },

                },
                options
            );

            const { value } = result;
            const { _id, ...rest } = value;
            return { id: _id.toString(), ...rest };

        } catch (error) {
            return error;
        }
    }

    async function removeById({ id: _id }) {
        try {
            const db = await makeDb();
            const result = await db.collection('financialTransaction').deleteOne({ _id: ObjectID(_id) });

            return result.deletedCount;

        } catch (error) {
            return error;
        }
    }
}