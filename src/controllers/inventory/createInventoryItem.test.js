
const makeFakeInventoryItem = require('../../__test__/fixtures/inventoryItem')
const makeCreateInventoryItem = require('./createInventoryItem')

describe('create inventory item controller', () => {

    it('item created successfully', async () => {
        const inventoryItem = makeFakeInventoryItem()

        const request = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: { ...inventoryItem }
        }

        const createInventoryItem = makeCreateInventoryItem({
            addInventoryItem: inventoryItemData => inventoryItemData,
            jwtVerifyToken: httpRequest => {
                return {
                    statusCode: 201
                }
            },
        })

        const expected = {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 201,
            body: { ...inventoryItem }
        }

        const actual = await createInventoryItem(request);
        expect(actual).toMatchObject(expected);
    })

    it('reporting errors', async () => {
        const inventoryItem = makeFakeInventoryItem()

        const request = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: { ...inventoryItem }
        }

        const createInventoryItem = makeCreateInventoryItem({
            addInventoryItem: inventoryItemData => {
                throw Error('BOOM CANT CREATE ITEM!')
            },
            jwtVerifyToken: httpRequest => {
                return {
                    statusCode: 201
                }
            },
        })

        const expected = {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: { error: 'BOOM CANT CREATE ITEM!' }
        }

        const actual = await createInventoryItem(request);
        expect(actual).toMatchObject(expected);
    })
})