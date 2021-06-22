const {ObjectID} = require('mongodb');

const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const makeFindFinancialTransaction = require('./findFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('find financial transaction',()=>{

    let findFinancialTransaction,financialTransactionCollection;
    beforeAll(()=>{
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
        findFinancialTransaction = makeFindFinancialTransaction({financialTransactionCollection}); 
    });

    
    it('found transaction successfully',async ()=>{

        const fakeTransaction = makeFakeTransaction();
        const {id,...insertTransaction} = fakeTransaction

        const insertedTransaction = await financialTransactionCollection.insert({...insertTransaction});

        const foundTransaction = await findFinancialTransaction(insertedTransaction);

        expect(foundTransaction).toMatchObject(insertedTransaction);
    });

    it('you must supply an id',async ()=>{
        const fakeTransaction = makeFakeTransaction();
        const {id,...insertTransaction} = fakeTransaction

        const insertedTransaction = await financialTransactionCollection.insert({...insertTransaction});
        insertedTransaction.id = null;

        expect(findFinancialTransaction(insertTransaction)).
            rejects.toThrow('You must supply an id.');
    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });
});