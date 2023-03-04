module.exports = function makeCommon({ makeDb, ObjectID }) {

    return Object.freeze({
        findAll,
        findById,
        insert,
        update,
        checkCollectionExists,
        // removeById,
        // removeMany
    });

    async function findAll({ collectionName }) {
        const db = await makeDb()
        const result = await db.collection(collectionName).find({})
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        })
        );
    }

    async function findById({ id: _id, collectionName }) {
        const db = await makeDb()
        const result = await db.collection(collectionName).find({ _id: ObjectID(_id) })
        const found = await result.toArray();

        if (found.length === 0)
            return null;

        const { _id: id, ...info } = found[0];
        //fix this to string
        return { id, ...info };
    }

    async function insert({ collectionName, insertObj }) {

        const db = await makeDb();
        const result = await db.collection(collectionName).insertOne({ ...insertObj });
        const insertedInfo = result.ops[0];
        const { _id, ...insertedRow } = insertedInfo;
        return { id: _id, ...insertedRow };

    }

    async function update({ collectioName, updatedData }) {
        const { id, ...setNewData } = updatedData;

        const options = { returnOriginal: false };
        const db = await makeDb();
        const result = await db.collection(collectioName).findOneAndUpdate({ _id: ObjectID(id) },
            {
                $set: { ...setNewData }
            },
            options
        );

        const { value } = result;
        const { _id, ...rest } = value;
        return { id: _id.toString(), ...rest };
    }

    async function checkCollectionExists({ collectionName }) {
        const db = await makeDb();
        const count = await db.collection(collectionName).countDocuments({});
        if (count == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
