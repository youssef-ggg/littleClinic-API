const {ObjectID} = require('mongodb');

const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const makeEditFinancialTransaction = require('./editFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('edit financial transaction',()=>{

    let editFinancialTransaction,financialTransactionCollection;
    beforeAll(()=>{
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
        editFinancialTransaction = makeEditFinancialTransaction({financialTransactionCollection});
    });

    it('successfully edit financial transaction',async()=>{

        const fakeTransaction = makeFakeTransaction();
        const {id, ...transactionData} = fakeTransaction;
        const insertedTransaction = await financialTransactionCollection.insert({...transactionData});

        transactionData.description = 'changed description';

        const updatedTransaction = await editFinancialTransaction({
            id:insertedTransaction.id,...transactionData
        });

        expect(updatedTransaction.id).toBe(insertedTransaction.id);
        expect(updatedTransaction.description).toEqual('changed description');

    });

    it('you must supply an id',async()=>{

        const fakeTransaction = makeFakeTransaction();
        const {id, ...transactionData} = fakeTransaction;
        const insertedTransaction = await financialTransactionCollection.insert({...transactionData});

        fakeTransaction.description = 'changed description';
        transactionData.id = null;

        expect(editFinancialTransaction(transactionData)).
            rejects.toThrow('You must supply an id.');

    });

    it('this transaction doesn\'t exist',async ()=>{

        const fakeTransaction = makeFakeTransaction();
        const {id, ...transactionData} = fakeTransaction;
        const insertedTransaction = await financialTransactionCollection.insert({...transactionData});

        fakeTransaction.id = '60578f606defb028c820befb';
        fakeTransaction.description = 'changed description';
        

        expect(editFinancialTransaction(fakeTransaction)).
            rejects.toThrow('This transaction doesn\'t exist.');

    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });
    
});