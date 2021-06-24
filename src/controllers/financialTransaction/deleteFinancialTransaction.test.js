
const makeDeleteFinancialTransaction = require('./deleteFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('delete transaction controller',()=>{
    
    it('delete transaction successfully',async()=>{
        const fakeTransaction = makeFakeTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{id:fakeTransaction.id}
        }

        const deleteFinancialTransaction = makeDeleteFinancialTransaction({
            removeFinancialTransaction:({id})=>{
                return {
                    deletedCount:1,
                    message:'Financial Transaction deleted successfully.'
                }
            },
            jwtVerifyToken(httpRequest){
                return {
                    headers:httpRequest.headers,
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
                deleted:{
                    deletedCount:1,
                    message:'Financial Transaction deleted successfully.'
    
                }
            }
        }

        const actual = await deleteFinancialTransaction(request);
        
        expect(expected).toMatchObject(actual);

    });

    it('Item to delete not found',async()=>{
        const fakeTransaction = makeFakeTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{id:fakeTransaction.id}
        }

        const deleteFinancialTransaction = makeDeleteFinancialTransaction({
            removeFinancialTransaction:({id})=>{
                return {
                    deletedCount:0,
                    message:'Financial Transaction not found, nothing to delete.'
                }
            },
            jwtVerifyToken(httpRequest){
                return {
                    headers:httpRequest.headers,
                    statusCode:200
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:404,
            body:{
                deleted:{
                    deletedCount:0,
                    message:'Financial Transaction not found, nothing to delete.'
    
                }
            }
        }

        const actual = await deleteFinancialTransaction(request);
        
        expect(expected).toMatchObject(actual);
    });

    it('verification needed',async ()=>{
        const fakeTransaction = makeFakeTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{id:fakeTransaction.id}
        }

        const deleteFinancialTransaction = makeDeleteFinancialTransaction({
            removeFinancialTransaction:({id})=>{
                return {
                    deletedCount:1,
                    message:'Financial Transaction deleted successfully.'
                }
            },
            jwtVerifyToken(httpRequest){
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
            body:{
                error:'forbidden.'
            }
        }

        const actual = await deleteFinancialTransaction(request);
        
        expect(expected).toMatchObject(actual);
    });

    it('reporting errors',async ()=>{
        const fakeTransaction = makeFakeTransaction();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{id:fakeTransaction.id}
        }

        const deleteFinancialTransaction = makeDeleteFinancialTransaction({
            removeFinancialTransaction:({id})=>{
                throw new Error('BOOM CAN\'T DELETE TRANSACTION!');
            },
            jwtVerifyToken(httpRequest){
                return {
                    headers:httpRequest.headers,
                    statusCode:200
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:400,
            body:{
                error: 'BOOM CAN\'T DELETE TRANSACTION!'
            }
        }

        const actual = await deleteFinancialTransaction(request);
        
        expect(expected).toMatchObject(actual);
    });
});