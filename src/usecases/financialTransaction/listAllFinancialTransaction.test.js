const {ObjectID} = require('mongodb');

const makeTransactionCollection = require('../../dataAcces/financialTransaction');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeListAllFinancialTransaction = require('./listAllFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');


describe('list all financial transaction',()=>{

    let financialTransactionCollection,listAllFinancialTransaction;
    
    beforeAll(()=>{
        financialTransactionCollection = makeTransactionCollection({makeDb,ObjectID});
        listAllFinancialTransaction = makeListAllFinancialTransaction({financialTransactionCollection});

    });

    it('get all financial transactions',async ()=>{
        const fakeFinanicalTransactionList = [];

        for(let index = 0;index<3;index++){
            const fakeFinanicalTransaction = makeFakeTransaction();
            const {id, ...fakeFinanicalTransactionData} = fakeFinanicalTransaction;
            fakeFinanicalTransactionList.push( 
                await financialTransactionCollection.insert(fakeFinanicalTransactionData));
        }

        const financialTransactionList = await listAllFinancialTransaction();

        expect(financialTransactionList.length).toEqual(3);
        
        for (let index = 0;index <3;index++){;
            expect(financialTransactionList[index]).toMatchObject(fakeFinanicalTransactionList[index]);
        }
        
    });

    afterAll(()=>{
        clearDb('financialTransaction');
        closeDb();
    });
});