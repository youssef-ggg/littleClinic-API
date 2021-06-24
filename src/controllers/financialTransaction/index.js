const {jwtVerifyToken} = require('../../jwtAuthorization')

const financialTransactionServices = require('../../usecases/financialTransaction');

const makeCreateFinancialTransaction = require('./createFinancialTransaction');
const makeGetMonthlyTransactions = require('./getMonthlyTransactions');
const makeGetAllFinancialTransaction = require('./getAllFinancialTransaction');
const makeGetFinancialTransactionById = require('./getFinancialTransactionById');
const makeUpdateFinancialTransaction = require('./updateFinancialTransaction');

const {addFinancialTransaction,listMonthlyFinancialTransaction,
    listAllFinancialTransaction,findFinancialTransaction,
    editFinancialTransaction} = financialTransactionServices;

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
const updateFinancialTransaction = makeUpdateFinancialTransaction({
    editFinancialTransaction,jwtVerifyToken
})
const  financialTransactionController = Object.freeze({
    createFinancialTransaction,getMonthlyTransactions,getAllFinancialTransaction,
    getFinancialTransactionById,updateFinancialTransaction
});

module.exports = financialTransactionController;