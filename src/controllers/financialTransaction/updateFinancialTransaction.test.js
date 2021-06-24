
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');
const makeUpdateFinancialTransaction = require('./updateFinancialTransaction');

describe('update transaction contoller',()=>{

    it('successfull update',async ()=>{
        const fakeTransaction = makeFakeTransaction();
        const {id,...updatedTransaction} = fakeTransaction;

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id
            },
            body:{
                ...updatedTransaction
            }
        }

        const updateFinancialTransaction = makeUpdateFinancialTransaction({
            editFinancialTransaction:updatedTransaction=>updatedTransaction,
            jwtVerifyToken:httpRequest=>{
                return {
                    statusCode:200
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },           
            statusCode:200,
            body:{
                id,
                ...updatedTransaction
            }

        }

        const actual = await updateFinancialTransaction(request);
        expect(expected).toMatchObject(actual);

    });

    it('verification needed',async()=>{
        const fakeTransaction = makeFakeTransaction();
        const {id,...updatedTransaction} = fakeTransaction;

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id
            },
            body:{
                ...updatedTransaction
            }
        }

        const updateFinancialTransaction = makeUpdateFinancialTransaction({
            editFinancialTransaction:updatedTransaction=>updatedTransaction,
            jwtVerifyToken:httpRequest=>{
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

        const actual = await updateFinancialTransaction(request);
        expect(expected).toMatchObject(actual);


    });

    it('reporting errors',async()=>{
        const fakeTransaction = makeFakeTransaction();
        const {id,...updatedTransaction} = fakeTransaction;

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id
            },
            body:{
                ...updatedTransaction
            }
        }

        const updateFinancialTransaction = makeUpdateFinancialTransaction({
            editFinancialTransaction:updatedTransaction=>{
                throw new Error('BOOM CAN\'T UPDATE TRANSACTION!');
            },
            jwtVerifyToken:httpRequest=>{
                return {
                    statusCode:200
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:400,
            body: { error: 'BOOM CAN\'T UPDATE TRANSACTION!' }
        }

        const actual = await updateFinancialTransaction(request);
        expect(expected).toMatchObject(actual);
    });
});