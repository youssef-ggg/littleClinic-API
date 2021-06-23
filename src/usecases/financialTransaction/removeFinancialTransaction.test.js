
const {ObjectID} = require('mongodb');
const{makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const makeRemoveFinancialTransaction = require('./removeFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('remove financial transaction',()=>{

    let financialTransactionCollection,removeFinancialTransaction;

    beforeAll(()=>{
        
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
        removeFinancialTransaction = makeRemoveFinancialTransaction({financialTransactionCollection});
    });

    it('successful removal',async()=>{
        
        const fakeTransaction = makeFakeTransaction();
        const {id:fakeID,...transactionData} = fakeTransaction;
        const insertedTransaction = await financialTransactionCollection.insert({...transactionData});

        const expected = {
            deletedCount:1,
            message:'Financial Transaction deleted successfully.'
        }
        const actual =  await removeFinancialTransaction(insertedTransaction);
        
        expect(actual).toMatchObject(expected);
    });

    it('this transaction doesn\'t exist ',async()=>{

        const fakeTransaction = makeFakeTransaction();
        fakeTransaction.id =  123
        const expected = {
            deletedCount: 0,
            message: 'Financial Transaction not found, nothing to delete.'
        }

        const actual = await removeFinancialTransaction(fakeTransaction);
        expect(actual).toMatchObject(expected);
    });

    it('must include id',async ()=>{

        const fakeTransaction = makeFakeTransaction();
        const {id,...fakeTransactionData} = fakeTransaction;
        const expected = {
            deletedCount: 0,
            message: 'You must supply an id for a Financial Transaction.'
        }

        const actual = await removeFinancialTransaction(fakeTransactionData);
        expect(actual).toMatchObject(expected);
    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });
});