const { ObjectID } = require('mongodb')
const faker = require('faker')
const { makeDb, clearDb, closeDb } = require('../../__test__/fixtures/db')
const makeBalanceTransactionCollection = require('../../dataAcces/transactionBalance')
const makeAdjustFinanialBalance = require('./adjustFinancialBalance')
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction')
const buildMakeFinancialTransaction = require('../../models/financialTransaction')
const { typeEnum } = require('../../utils/enums')

describe('adjust financial balance', () => {

    let balanceTransactionCollection, adjustFinancialBalance, makeFinancialTransaction
    const currentMonthYearDate = new Date('2021-10-2').getTime()
    const dayOfTransaction = new Date(currentMonthYearDate).getDate()
    const monthOfTransaction = new Date(currentMonthYearDate).getMonth()
    const yearOfTransaction = new Date(currentMonthYearDate).getFullYear()


    beforeAll(() => {
        makeFinancialTransaction = buildMakeFinancialTransaction({ typeEnum })
        balanceTransactionCollection = makeBalanceTransactionCollection({ makeDb, ObjectID })
        adjustFinancialBalance = makeAdjustFinanialBalance({ balanceTransactionCollection })
    })

    it('adjust financial balance empty table', async () => {
        const fakeTransaction = makeFakeTransaction({ date: currentMonthYearDate })
        const { id, ...transactionData } = fakeTransaction

        const financialTransaction = makeFinancialTransaction(fakeTransaction)
        const insertedfinancialBalances =
            await adjustFinancialBalance(financialTransaction)

        const amountValues = {
            investment: 0,
            revenue: 0,
            other: 0,
            wages: 0,
            equipment: 0,
            marketing: 0
        }
        amountValues[fakeTransaction.type] = fakeTransaction.amount
        expect(insertedfinancialBalances).toMatchObject({
            description: 'Closing Balance',
            date: new Date(yearOfTransaction, monthOfTransaction + 1, 0).getTime(),
            ...amountValues
        })
    })

    it('adjust financial balance, one balance in collection', async () => {

        const previousMonthTransaction = (await balanceTransactionCollection.findAll())[0]
        const randomDay = faker.random.number(28)
        const fakeTransaction =
            makeFakeTransaction({
                date: new Date(yearOfTransaction, monthOfTransaction + 1, randomDay).getTime()
            })

        const financialTransaction = makeFinancialTransaction(fakeTransaction)
        const insertedfinancialBalances =
            await adjustFinancialBalance(financialTransaction)

        const { id, description, date,
            createdOn, modifiedOn, ...lastMonthClosingBalance } = previousMonthTransaction

        const amountValues = {
            investment: previousMonthTransaction.investment,
            revenue: previousMonthTransaction.revenue,
            other: previousMonthTransaction.other,
            wages: previousMonthTransaction.wages,
            equipment: previousMonthTransaction.equipment,
            marketing: previousMonthTransaction.marketing
        }
        amountValues[fakeTransaction.type] += fakeTransaction.amount
        expect(insertedfinancialBalances).toMatchObject({
            description: 'Closing Balance',
            date: new Date(yearOfTransaction, monthOfTransaction + 2, 0).getTime(),
            ...amountValues
        })
    })

    it('adjust financial balance with older balances', async () => {
        const previousBalanceTransactions = await balanceTransactionCollection.findAll()
        const randomDay = faker.random.number(28)
        const fakeTransaction =
            makeFakeTransaction({
                date: new Date(yearOfTransaction, monthOfTransaction + 1, randomDay).getTime()
            })

        const financialTransaction = makeFinancialTransaction(fakeTransaction)

        const insertedfinancialBalances =
            await adjustFinancialBalance(financialTransaction)

        const { id, description, date, createdOn, modifiedOn, ...previousMonthClosingBalance }
            = previousBalanceTransactions[0]

        const amountValues = {
            investment: previousBalanceTransactions[1].investment,
            revenue: previousBalanceTransactions[1].revenue,
            other: previousBalanceTransactions[1].other,
            wages: previousBalanceTransactions[1].wages,
            equipment: previousBalanceTransactions[1].equipment,
            marketing: previousBalanceTransactions[1].marketing
        }
        amountValues[fakeTransaction.type] += fakeTransaction.amount
        expect(insertedfinancialBalances).toMatchObject({
            description: 'Closing Balance',
            date: new Date(yearOfTransaction, monthOfTransaction + 2, 0).getTime(),
            ...amountValues
        })
    })


    afterAll(() => {
        clearDb('balanceTransaction')

        closeDb()
    })
})
