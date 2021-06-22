const {jwtVerifyToken} = require('../../jwtAuthorization')

const financialTransactionServices = require('../../usecases/financialTransaction');

const makeCreateFinancialTransaction = require('./createFinancialTransaction');
const makeGetMonthlyTransactions = require('./getMonthlyTransactions');
const makeGetAllFinancialTransaction = require('./getAllFinancialTransaction');

const {addFinancialTransaction,listMonthlyFinancialTransaction,
    listAllFinancialTransaction} = financialTransactionServices;

const createFinancialTransaction = 
    makeCreateFinancialTransaction({addFinancialTransaction,jwtVerifyToken});
const getMonthlyTransactions = 
    makeGetMonthlyTransactions({listMonthlyFinancialTransaction,jwtVerifyToken});
const getAllFinancialTransaction = makeGetAllFinancialTransaction({
    listAllFinancialTransaction,jwtVerifyToken
});

const  financialTransactionController = Object.freeze({
    createFinancialTransaction ,getMonthlyTransactions,getAllFinancialTransaction
});

module.exports = financialTransactionController;