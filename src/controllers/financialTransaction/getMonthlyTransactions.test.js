
const makeFakeTransaction = require('../../__test__/fixtures/financialTransaction');
const makeGetMonthlyTransactions = require('./getMonthlyTransactions');

describe('get monthly transactions',()=>{

    it('sucessfull request',async()=>{
        
        const nowDate = new Date();
        const thisMonth = nowDate.getMonth();
        const thisYear = nowDate.getFullYear();
        const monthStart = new Date(thisYear,thisMonth,1,0,0,0,0);
        const monthEnd = new Date(thisYear,thisMonth+1,0,0,0,0,0);

        const request = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                month:thisMonth,
                year:thisYear,
            }
        }

        const financialTransactionList = [];
        for(index=0;index<3;index++){
            financialTransactionList.push(makeFakeTransaction());
        }
        const financialTransactionFiltered = financialTransactionList.filter((transaction)=>{
            if(transaction.date>=monthStart.getTime()&&transaction.date<=monthEnd)
                return transaction;
        });

        const getMonthlyTransactions = makeGetMonthlyTransactions({
            listMonthlyFinancialTransaction:({month:thisMonth,year:thisYear})=>{
               
                return {...financialTransactionFiltered}
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
            statusCode:200,
            body:{...financialTransactionFiltered}
        }
        const result = await getMonthlyTransactions(request);
        expect(expected).toMatchObject(result);
        
    });

    it('jwt verfication',async()=>{

        const nowDate = new Date();
        const thisMonth = nowDate.getMonth();
        const thisYear = nowDate.getFullYear();
        const monthStart = new Date(thisYear,thisMonth,1,0,0,0,0);
        const monthEnd = new Date(thisYear,thisMonth+1,0,0,0,0,0);
        
        const request = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                month:thisMonth,
                year:thisYear,
            }
        }

        financialTransactionList = [];
        for(index=0;index<3;index++){
            financialTransactionList.push(makeFakeTransaction());
        }
        const financialTransactionFiltered = financialTransactionList.filter((transaction)=>{
            if(transaction.date>=monthStart.getTime()&&transaction.date<=monthEnd)
                return transaction;
        });

        const getMonthlyTransactions = makeGetMonthlyTransactions({
            listMonthlyFinancialTransaction:({month:thisMonth,year:thisYear})=>{
               
                return {...financialTransactionFiltered}
            },
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

        const result = await getMonthlyTransactions(request);
        expect(expected).toMatchObject(result);
    });

    it('reproting errors',async()=>{
        const nowDate = new Date();
        const thisMonth = nowDate.getMonth();
        const thisYear = nowDate.getFullYear();
        const monthStart = new Date(thisYear,thisMonth,1,0,0,0,0);
        const monthEnd = new Date(thisYear,thisMonth+1,0,0,0,0,0);
        
        const request = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                month:thisMonth,
                year:thisYear,
            }
        }

        financialTransactionList = [];
        for(index=0;index<3;index++){
            financialTransactionList.push(makeFakeTransaction());
        }
        const financialTransactionFiltered = financialTransactionList.filter((transaction)=>{
            if(transaction.date>=monthStart.getTime()&&transaction.date<=monthEnd)
                return transaction;
        });

        const getMonthlyTransactions = makeGetMonthlyTransactions({
            listMonthlyFinancialTransaction:({month:thisMonth,year:thisYear})=>{
               
                throw new Error('BOOM CAN\'T LIST TRANSACTION!')
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
            body: { error: 'BOOM CAN\'T LIST TRANSACTION!' }
        }

        const result = await getMonthlyTransactions(request);
        expect(expected).toMatchObject(result);
    });
});