const {ObjectID} = require('mongodb');
const faker = require('faker');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db'); 
const makeListMonthlyFinancialTransaction = require('./listMonthlyFinancialTransactions');
const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('list transaction  by month',()=>{

    let listMonthlyFinancialTransactions,financialTransactionCollection;

    beforeAll(()=>{
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
        listMonthlyFinancialTransactions = 
            makeListMonthlyFinancialTransaction({financialTransactionCollection});
    });

    it('successful list by month ',async()=>{
        const fakeFinanicalTransactionList = [];
        
        for(let index = 0;index<3;index++){
            const fakeFinanicalTransaction = makeFakeTransaction({date:faker.date.soon().getTime()});
            const {id, ...fakeFinanicalTransactionData} = fakeFinanicalTransaction;
            fakeFinanicalTransactionList.push( 
                await financialTransactionCollection.insert(fakeFinanicalTransactionData));
        }

        const nowDate = new Date();
        const thisMonth = nowDate.getMonth();
        const thisYear = nowDate.getFullYear();
        const monthStart = new Date(thisYear,thisMonth,1,0,0,0,0);
        const monthEnd = new Date(thisYear,thisMonth+1,0,23,59,59,999);
        const financialTransactionList = 
            await listMonthlyFinancialTransactions({month:thisMonth,year:thisYear});

        for (transaction of financialTransactionList){
            expect(transaction.date).toBeGreaterThanOrEqual(monthStart.getTime());
            expect(transaction.date).toBeLessThanOrEqual(monthEnd.getTime());    
        } 
        
    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });
});