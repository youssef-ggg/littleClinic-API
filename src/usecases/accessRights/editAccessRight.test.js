const { ObjectID } = require('mongodb')
const faker = require('faker')

const { makeDb, clearDb, closeDb } = require('../../__test__/fixtures/db')
const makeAccessRightCollection = require('../../dataAcces/accessRights')
const MakeEditAccessRight = require('./editAccessRight')
const makeFakeAccessRight = require('../../__test__/fixtures/accessRight')

describe('edit accesRight', () => {

    let accessRightsCollection, editAccessRight

    beforeAll(() => {
        accessRightsCollection = makeAccessRightCollection({ makeDb, ObjectID })
        editAccessRight = MakeEditAccessRight({ accessRightsCollection })
    })

    it('edit AccessRight', async () => {
        const newAccessRight = makeFakeAccessRight()
        const insertedAccessRight = await accessRightsCollection.insert(newAccessRight)

        const updateAccessRight = makeFakeAccessRight({
            id: insertedAccessRight.id,
        })

        const updatedAccessRight = await editAccessRight(updateAccessRight)

        expect(insertedAccessRight.id).toBe(updatedAccessRight.id)
        expect(insertedAccessRight.createdOn).toBe(updatedAccessRight.createdOn)

    })

    afterAll(() => {
        clearDb('accessRights')
        closeDb()
    })

})