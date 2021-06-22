
const makeGetAllFinancialTransaction = require('./getAllFinancialTransaction');
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');

describe('get financial transaction contoller',()=>{

    it('list all transactions',async()=>{

        const financialTransactionList = [];
        for(index=0;index<3;index++){
            financialTransactionList.push(makeFakeTransaction());
        }
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }

        const getAllFinancialTransaction = makeGetAllFinancialTransaction({
            listAllFinancialTransaction:()=>financialTransactionList,
            jwtVerifyToken(httpRequest){
                return {
                    headers:httpRequest.headers,
                    statusCode:200
                }
            }
        });

        const response = await getAllFinancialTransaction(request);

        const {statusCode,body} = response;
        expect(statusCode).toBe(200);
        const {financialTransactions} = body;
        for (let index = 0;index <3;index++){

            expect(financialTransactions[index]).toMatchObject(financialTransactionList[index]);
        }
        
    });

    it('jwt verfication',async()=>{
        const financialTransactionList = [];
        for(index=0;index<3;index++){
            financialTransactionList.push(makeFakeTransaction());
        }
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }

        const getAllFinancialTransaction = makeGetAllFinancialTransaction({
            listAllFinancialTransaction:()=>financialTransactionList,
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
            body:{error:'forbidden.'}
        }

        const result = await getAllFinancialTransaction(request);
        
        expect(expected).toMatchObject(result);

    });

    it('reporting errors',async()=>{

        const financialTransactionList = [];
        for(index=0;index<3;index++){
            financialTransactionList.push(makeFakeTransaction());
        }
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }

        const getAllFinancialTransaction = makeGetAllFinancialTransaction({
            listAllFinancialTransaction:()=>{
                throw new Error('BOOM CAN\'T LIST TRANSACTION!');
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
            body: { error: 'BOOM CAN\'T LIST TRANSACTION!' }
        }

        const result = await getAllFinancialTransaction(request);
        expect(expected).toMatchObject(result);
    });
});