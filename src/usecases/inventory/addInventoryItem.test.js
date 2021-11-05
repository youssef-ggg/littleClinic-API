const { ObjectID } = require('mongodb')

const makeAddInventoryItem = require('./addInventoryItem')
const { makeDb, clearDb, closeDb } = require('../../__test__/fixtures/db')
const makeInventoryCollection = require('../../dataAcces/inventory')
const makeFakeInventoryItem = require('../../__test__/fixtures/inventoryItem')
const { fake } = require('faker')

describe("Add Inventory Item", () => {

    let inventoryCollection, addInventoryItem
    beforeAll(() => {
        inventoryCollection = makeInventoryCollection({ makeDb, ObjectID })
        addInventoryItem = makeAddInventoryItem({ inventoryCollection })
    })

    it('Add Inventory successfully', async () => {

        const fakeInventoryItem = makeFakeInventoryItem()
        const insertedInventoryItem = await addInventoryItem(fakeInventoryItem)

        expect(insertedInventoryItem.name).toEqual(fakeInventoryItem.name)
        expect(insertedInventoryItem.unitCost).toEqual(fakeInventoryItem.unitCost)
        expect(insertedInventoryItem.quantity).toEqual(fakeInventoryItem.quantity)
        expect(insertedInventoryItem.reorderQuantity).toEqual(fakeInventoryItem.reorderQuantity)
        expect(insertedInventoryItem.createdOn).toEqual(fakeInventoryItem.createdOn)
        expect(insertedInventoryItem.modifiedOn).toEqual(fakeInventoryItem.modifiedOn)
    })

    xit('must have a name', async () => {
        const fakeInventoryItem = makeFakeInventoryItem({ name: null })
        expect(addInventoryItem(fakeInventoryItem))
            .rejects
            .toEqual(new Error('Inventory Item must have a name'))
    })


    afterAll(() => {
        clearDb('inventory')
        closeDb()
    })
})