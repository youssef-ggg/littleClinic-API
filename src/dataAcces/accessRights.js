module.exports = function makeAccessRightsCollection({ makeDb, ObjectID }) {

    return Object.freeze({
        insert,
        insertUserRole,
        findUserRole,
        checkAccessRight,
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
}