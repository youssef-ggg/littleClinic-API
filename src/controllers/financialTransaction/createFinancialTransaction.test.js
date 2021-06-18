const faker = require('faker');
const makeFakeFinancialTransaction = require('../../__test__/fixtures/financialTransaction');
const makeCreateFinancialTransaction = require('./createFinancialTransaction');

describe('creat financial transaction controller',()=>{

    it('transaction created successfully',async()=>{

        const financialTransaction = makeFakeFinancialTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:financialTransaction.id
            },
            body:{...financialTransaction}
        }

        const createFinancialTransaction = makeCreateFinancialTransaction({
            addFinancialTransaction:(transactionData)=>transactionData,
            jwtVerifyToken:httpRequest=>{
                return {
                    statusCode:201
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:201,
            body:{...financialTransaction}
        }

        const actual = await createFinancialTransaction(request); 
        expect(actual).toMatchObject(expected);
    });

    it('verification problems',async()=>{

        const financialTransaction = makeFakeFinancialTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:financialTransaction.id
            },
            body:{...financialTransaction}
        }

        const createFinancialTransaction = makeCreateFinancialTransaction({
            addFinancialTransaction:(transactionData)=>transactionData,
            jwtVerifyToken:request=>{ 
                return {
                   statusCode:403,
                   body:{
                       error:'forbidden.'
                   }
               }
           }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }
        const actual = await createFinancialTransaction(request);
        expect(actual).toEqual(expected);

    });

    it('reproting errors',async()=>{

        const financialTransaction = makeFakeFinancialTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:financialTransaction.id
            },
            body:{...financialTransaction}
        }

        const createFinancialTransaction = makeCreateFinancialTransaction({
            addFinancialTransaction:(transactionData)=> {
                throw Error('BOOM CANT CREATE TRANSACTION!')
            },
            jwtVerifyToken:httpRequest=>{
                return {
                    statusCode:201
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:400,
            body: { error: 'BOOM CANT CREATE TRANSACTION!' }
        }

        const actual = await createFinancialTransaction(request); 
        expect(actual).toMatchObject(expected);

    });

});