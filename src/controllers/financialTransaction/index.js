const {jwtVerifyToken} = require('../../jwtAuthorization')

const financialTransactionServices = require('../../usecases/financialTransaction');

const makeCreateFinancialTransaction = require('./createFinancialTransaction');
const makeGetMonthlyTransactions = require('./getMonthlyTransactions');

const {addFinancialTransaction,listMonthlyFinancialTransaction} = financialTransactionServices;

const createFinancialTransaction = 
    makeCreateFinancialTransaction({addFinancialTransaction,jwtVerifyToken});
const getMonthlyTransactions = 
    makeGetMonthlyTransactions({listMonthlyFinancialTransaction,jwtVerifyToken});

const  financialTransactionController = Object.freeze({
    createFinancialTransaction ,getMonthlyTransactions
});

module.exports = financialTransactionController;