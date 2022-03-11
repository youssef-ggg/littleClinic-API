
module.exports = function makeAccessRightsCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        insert,
        insertUserRole,
        findAllRoles,
        findUserRole,
        checkAccessRight,
        findAllAccessRights,
        findByUserRole,
        findAccessRightById,
        updateAccessRight
    })

    async function insert(accessRight) {
        const db = await makeDb()
        const result = await db.collection('accessRights').insertOne(accessRight)
        const { _id, ...insertedInfo } = result.ops[0]
        return { id: _id.toString(), ...insertedInfo }
    }

    async function insertUserRole(role) {
        const db = await makeDb()
        const result = await db.collection('accessRoles').insertOne(role)
        const { _id, ...insertedInfo } = result.ops[0]
        return { id: _id.toString(), ...insertedInfo }
    }

    async function findUserRole({ role }) {
        const db = await makeDb()
        const result = await db.collection('accessRoles').find({
            role
        })
        const found = await result.toArray()
        if (found.length === 0)
            return null
        //change that from [] to {}
        return found
    }
    async function findAllRoles() {
        const db = await makeDb();
        const result = await db.collection('accessRoles').find({})
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id: id.toString(),
            ...found
        }))
    }
    async function checkAccessRight({ module, userRole }) {
        const db = await makeDb()
        const result = await db.collection('accessRights').find({
            module, userRole
        })
        const found = await result.toArray()
        if (found.length === 0)
            return null

        const { _id, ...insertedInfo } = found[0]
        return { id: _id.toString(), ...insertedInfo }
    }

    async function findByUserRole({ userRole }) {
        const db = await makeDb()
        const result = await db.collection('accessRights').find({
            userRole
        })
        const found = await result.toArray()
        const userAccessModules = []
        if (found.length === 0)
            return null

        found.forEach(element => {
            const { _id, ...insertedInfo } = element
            userAccessModules.push({ id: _id.toString(), ...insertedInfo })
        })
        return userAccessModules
    }

    async function findAllAccessRights() {
        const db = await makeDb()
        const result = await db.collection('accessRights').find()
        const found = await result.toArray()
        const userAccessModules = []
        if (found.length === 0)
            return null

        found.forEach(element => {
            const { _id, ...insertedInfo } = element
            userAccessModules.push({ id: _id.toString(), ...insertedInfo })
        })
        return userAccessModules
    }

    async function findAccessRightById({ id: _id }) {

        const db = await makeDb()
        const result = await db.collection('accessRights').find({ _id: ObjectID(_id) })
        const found = await result.toArray()
        if (found.length === 0)
            return null

        const { _id: id, ...info } = found[0]
        return { id: id.toString(), ...info }
    }

    async function updateAccessRight(accessRightData) {

        const { id, ...updateAccessRightData } = accessRightData
        const options = { returnOriginal: false }
        const db = await makeDb()
        const result = await db.collection('accessRights').findOneAndUpdate({ _id: ObjectID(id) },
            {
                $set: { ...updateAccessRightData }
            },
            options
        )

        const { value } = result
        const { _id, ...rest } = value
        return { id: _id.toString(), ...rest }

    }
}