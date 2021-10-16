const { ObjectID } = require('mongodb');
const faker = require('faker');
const { makeDb, closeDb, clearDb } = require('../__test__/fixtures/db');
const makeBalanceTransactionCollection = require('./transactionBalance');
const makeFakeBalanceTransaction = require('../__test__/fixtures/balanceTransaction');

describe('financial balance', () => {

    let balanceTransactionCollection


    beforeAll(() => {
        balanceTransactionCollection = makeBalanceTransactionCollection({ makeDb, ObjectID })
    })

    it('add balance', async () => {
        const amount = faker.finance.amount()
        const transaction = makeFakeBalanceTransaction({ 'investment': amount, amount })
        const { id, ...insertTransaction } = transaction
        const result = await balanceTransactionCollection.insert({ ...insertTransaction })
        transaction.id = result.id
        expect(result).toMatchObject(transaction)
    })

    it('list all transactions', async () => {
        const inserts = await Promise.all(
            [makeFakeBalanceTransaction(), makeFakeBalanceTransaction(), makeFakeBalanceTransaction()]
                .map(
                    balanceTransactionCollection.insert
                )
        )

        const found = await balanceTransactionCollection.findAll()
        return inserts.forEach(insert => expect(found).toContainEqual(insert))

    })

    it('update balance transation', async () => {

        const fakeBalance = makeFakeBalanceTransaction()
        const { id, ...insert } = fakeBalance
        const result = await balanceTransactionCollection.insert({ ...insert })
        const update = { id: result.id, ...insert }

        update.investment = faker.finance.amount()
        update.revenue = faker.finance.amount()
        update.other = faker.finance.amount()
        update.wages = faker.finance.amount()
        update.equipment = faker.finance.amount()
        update.marketing = faker.finance.amount()
        update.date = faker.date.recent().getTime()

        const updated = await balanceTransactionCollection.update(update)

        expect(updated).toMatchObject(update)
    })

    it('find latest balances', async () => {
        for (let i = 0; i < 2; i++) {

            const transaction = makeFakeBalanceTransaction()
            const { id, ...insertTransaction } = transaction
            await balanceTransactionCollection.insert({ ...insertTransaction })
        }

        const latestTransaction = makeFakeBalanceTransaction({ date: Date.now() })
        const { id, ...insertLatestBalance } = latestTransaction
        const insertedLatestBalance = await balanceTransactionCollection.insert(insertLatestBalance)

        const returnedLastestTransactions = await balanceTransactionCollection.findLatestBalances()

        expect(returnedLastestTransactions[0]).toMatchObject(insertedLatestBalance)
    })

    it('return transaction by month year', async () => {

        const day = faker.random.number(27) + 1
        const month = 10 // october
        const year = 2021

        const prevoiusMonthClosingDate = new Date(`2020-${month - 1}-30`).getTime()
        const monthClosingDate = new Date(`2020-${month}-31`).getTime()
        
        const prevoiusMonthBalance = makeFakeBalanceTransaction({
            description:'Closing Balance',
            date: prevoiusMonthClosingDate
        })
        const monthBalance = makeFakeBalanceTransaction({
            description:'Closing Balance',
            date: monthClosingDate
        })


        const insertedPreviousMonth = await balanceTransactionCollection.insert({ ...prevoiusMonthBalance })
        const insertedTransaction = await balanceTransactionCollection.insert({ ...monthBalance })

        const returnedLastestTransactions =
            await balanceTransactionCollection.findByMonth({ month: 10, year: 2020 })

        expect(returnedLastestTransactions[0].date).toEqual(monthClosingDate)
        expect(returnedLastestTransactions[0].description).toEqual('Closing Balance')
        
        expect(returnedLastestTransactions[1].date).toEqual(prevoiusMonthClosingDate)
        expect(returnedLastestTransactions[1].description).toEqual('Closing Balance')
    })


    afterAll(() => {
        clearDb('balanceTransaction')
        closeDb()
    })
})