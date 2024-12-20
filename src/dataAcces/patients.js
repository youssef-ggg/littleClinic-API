module.exports = function makePatientCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        findAll,
        findById,
        insert,
        update,
        findPaginated,
        findByField,
        numberOfPatients
    });

    async function findAll() {
        try {
            const db = await makeDb();
            const result = await db.collection('patients').find({});
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
            const result = await db.collection('patients').find({ _id: ObjectID(_id) });
            const found = await result.toArray();

            if (found.length === 0)
                return null;

            const { _id: id, ...info } = found[0];
            //fix this to string
            return { id, ...info };

        } catch (error) {
            return error;
        }
    }

    async function insert(patientInfo) {

        try {
            const db = await makeDb();
            const result = await db.collection('patients').insertOne({ ...patientInfo });
            const insertedInfo = result.ops[0];
            const { _id, ...insertedPatient } = insertedInfo;
            return { id: _id, ...insertedPatient };

        } catch (error) {
            return error;
        }

    }
    async function update(patientData) {
        const { id, ...setNewPatient } = patientData;

        try {
            const options = { returnOriginal: false };
            const db = await makeDb();
            const result = await db.collection('patients').findOneAndUpdate({ _id: ObjectID(id) },
                {
                    $set: { ...setNewPatient }
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

    async function findPaginated({ pageNum, pageSize }) {

        const skips = (pageNum - 1) * pageSize;
        try {
            const db = await makeDb();
            const result = await db.collection('patients').find().skip(skips).limit(pageSize);

            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id: id.toString(),
                ...found
            })
            );

        } catch (error) {
            return error;
        }

    }

    async function findByField({ fieldName, fieldRegex }) {
        const db = await makeDb()
        const findLikeFieldName = {}
        findLikeFieldName[fieldName] = fieldRegex
        const result = await db.collection('patients').find({
           ...findLikeFieldName
        })

        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        })
        )
    }

    async function numberOfPatients() {
        try {
            const db = await makeDb();
            const result = await db.collection('patients').estimatedDocumentCount();
            return result;
        } catch (error) {
            return error;
        }
    }
}