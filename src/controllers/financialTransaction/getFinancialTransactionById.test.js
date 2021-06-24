
const makeGetFinancialTransactionById = require('./getFinancialTransactionById');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('get by id finacnial transaction',()=>{

    it('successfully gets a transaction by id',async()=>{
        
        const fakeTransaction = makeFakeTransaction();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeTransaction.id
            },
        }

        const getFinancialTransactionById = makeGetFinancialTransactionById({
            findFinancialTransaction:({id})=>fakeTransaction,
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
                financialTransaction:fakeTransaction
            }
        }

        const actual = await getFinancialTransactionById(request);

        expect(expected).toMatchObject(actual);
        
    });

    it('verification needed',async()=>{
        const fakeTransaction = makeFakeTransaction();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeTransaction.id
            },
        }

        const getFinancialTransactionById = makeGetFinancialTransactionById({
            findFinancialTransaction:({id})=>fakeTransaction,
            jwtVerifyToken:httpRequest=>{
                return {
                    statusCode:403
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{
                error:'forbidden.'
            }
        }

        const actual = await getFinancialTransactionById(request);

        expect(expected).toMatchObject(actual);
    });

    it('reproting errors',async()=>{
        const fakeTransaction = makeFakeTransaction();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeTransaction.id
            },
        }

        const getFinancialTransactionById = makeGetFinancialTransactionById({
            findFinancialTransaction:({id})=>{
                throw new Error('BOOM CAN\'T FIND TRANSACTION!');
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
            body: { error: 'BOOM CAN\'T FIND TRANSACTION!' }
        }

        const actual = await getFinancialTransactionById(request);

        expect(expected).toMatchObject(actual);
    });
});