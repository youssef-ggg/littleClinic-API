const { ObjectID } = require('mongodb');
const { makeDb, clearDb, closeDb } = require('../../__test__/fixtures/db');
const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const makeBalanceTransactionCollection = require('../../dataAcces/transactionBalance');
const makeAddFinancialTransaction = require('./addFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('add financial transaction', () => {

    let financialTransactionCollection, balanceTransactionCollection, addFinancialTransaction;

    beforeAll(() => {
        financialTransactionCollection = makeTransactionCollection({ makeDb, ObjectID });
        balanceTransactionCollection = makeBalanceTransactionCollection({ makeDb, ObjectID })
        addFinancialTransaction =
            makeAddFinancialTransaction({ financialTransactionCollection, balanceTransactionCollection });
    });

    it('successfully added transaction', async () => {
        const fakeTransaction = makeFakeTransaction();

        const insertedTransaction = await addFinancialTransaction(fakeTransaction);
        const { id, ...fakeTransactionData } = fakeTransaction;
        const { createdFinancialTransaction,financialBalances } = insertedTransaction;

        for (key in fakeTransactionData) {
            expect(fakeTransactionData[key]).toEqual(createdFinancialTransaction[key]);
        }
        // make a better test in the future
        expect(financialBalances).toMatchObject(expect.any(Array))
    });

    afterAll(() => {
        clearDb('financialTransaction');
        closeDb();
    })
})