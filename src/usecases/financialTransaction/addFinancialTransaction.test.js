const {ObjectID} = require('mongodb');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const makeAddFinancialTransaction = require('./addFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('add financial transaction',()=>{
    
    let financialTransactionCollection,addFinancialTransaction;

    beforeAll(()=>{
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
        addFinancialTransaction = makeAddFinancialTransaction({financialTransactionCollection}); 
    });

    it('successfully added transaction',async ()=>{
        const fakeTransaction = makeFakeTransaction();

        const insertedTransaction = await addFinancialTransaction(fakeTransaction);
        const {id,...fakeTransactionData} = fakeTransaction;
        for(key in fakeTransactionData)
        {
            expect(fakeTransactionData[key]).toEqual(insertedTransaction[key]);

        }
    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    })
})