const {ObjectID} = require('mongodb');
const faker = require('faker');
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

    it('list by month',async()=>{
        const nowDate = new Date();
        const thisMonth = nowDate.getMonth();
        const thisYear = nowDate.getFullYear();
        
        const inserts = await Promise.all(
            [makeFakeTransaction({date:faker.date.soon()}),
                makeFakeTransaction({date:faker.date.soon()}),
                makeFakeTransaction({date:faker.date.future()})].map(
                financialTransactionCollection.insert
            )
        );
        
        const monthStart = new Date(thisYear,thisMonth,1,0,0,0,0);
        const monthEnd = new Date(thisYear,thisMonth+1,0,23,59,59,999);

        const thisMonthTransactions = 
            await financialTransactionCollection.findByMonth({month:thisMonth,year:thisYear});

        for (transaction of thisMonthTransactions){
            expect(transaction.date).toBeGreaterThanOrEqual(monthStart.getTime());
            expect(transaction.date).toBeLessThanOrEqual(monthEnd.getTime());    
        }
    });

    it('update transaction',async()=>{
        const transaction = makeFakeTransaction();
        const {id,...insertTransaction} = transaction;
        const result = await financialTransactionCollection.insert({...insertTransaction});
        transaction.id = result.id;

        const updateTransactionData = makeFakeTransaction({description:'changed description'});
        updateTransactionData.id = result.id;

        const updatedTransaction = await financialTransactionCollection.update({...updateTransactionData});

        expect(updatedTransaction.id).toEqual(result.id);
        expect(updatedTransaction.description).toEqual('changed description');
        
    });
    
    it('remove single transaction',async()=>{
        const transaction = makeFakeTransaction();
        const {id,...insertTransaction} = transaction;
        const insertedTransaction = await financialTransactionCollection.insert({...insertTransaction});
        insertTransaction.id = insertedTransaction.id;

        return expect(await financialTransactionCollection.removeById({id:insertedTransaction.id})).toBe(1);
    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });

});