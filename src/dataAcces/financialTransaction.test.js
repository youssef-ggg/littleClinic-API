const {ObjectID} = require('mongodb');
const {makeDb,closeDb,clearDb} = require('../__test__/fixtures/db');
const makeTransactionCollection = require('./financialTransaction');
const makeFakeTransaction = require('../__test__/fixtures/financialTransaction');

describe('financial transaction db',()=>{

    let financialTransactionCollection;

    beforeEach(async () => {
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID})
      });

    it('insert a transaction',async()=>{
        const transaction = makeFakeTransaction();
        const {id,...insertTransaction} = transaction;
        const result = await financialTransactionCollection.insert({...insertTransaction});
        transaction.id = result.id;
        return expect(result).toEqual(transaction);
    });

    it('list all transactions',async()=>{
        const inserts = await Promise.all(
            [makeFakeTransaction(),makeFakeTransaction(),makeFakeTransaction()].map(
                financialTransactionCollection.insert
            )
        );
        
        const found = await financialTransactionCollection.findAll();
        expect.assertions(inserts.length);
        return inserts.forEach(insert => expect(found).toContainEqual(insert));

    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });

});