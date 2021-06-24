const {jwtVerifyToken} = require('../../jwtAuthorization')

const financialTransactionServices = require('../../usecases/financialTransaction');

const makeCreateFinancialTransaction = require('./createFinancialTransaction');
const makeGetMonthlyTransactions = require('./getMonthlyTransactions');
const makeGetAllFinancialTransaction = require('./getAllFinancialTransaction');
const makeGetFinancialTransactionById = require('./getFinancialTransactionById');

const {addFinancialTransaction,listMonthlyFinancialTransaction,
    listAllFinancialTransaction,findFinancialTransaction} = financialTransactionServices;

const createFinancialTransaction = 
    makeCreateFinancialTransaction({addFinancialTransaction,jwtVerifyToken});
const getMonthlyTransactions = 
    makeGetMonthlyTransactions({listMonthlyFinancialTransaction,jwtVerifyToken});
const getAllFinancialTransaction = makeGetAllFinancialTransaction({
    listAllFinancialTransaction,jwtVerifyToken
});
const getFinancialTransactionById = makeGetFinancialTransactionById({
    findFinancialTransaction,jwtVerifyToken
});

const  financialTransactionController = Object.freeze({
    createFinancialTransaction ,getMonthlyTransactions,getAllFinancialTransaction,getFinancialTransactionById
});

module.exports = financialTransactionController;