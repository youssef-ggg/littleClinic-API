const {jwtVerifyToken} = require('../../jwtAuthorization')

const financialTransactionServices = require('../../usecases/financialTransaction');

const makeCreateFinancialTransaction = require('./createFinancialTransaction');
const makeGetMonthlyTransactions = require('./getMonthlyTransactions');
const makeGetAllFinancialTransaction = require('./getAllFinancialTransaction');
const makeGetFinancialTransactionById = require('./getFinancialTransactionById');
const makeUpdateFinancialTransaction = require('./updateFinancialTransaction');
const makeDeleteFinancialTransaction =require('./deleteFinancialTransaction');

const {addFinancialTransaction,listMonthlyFinancialTransaction,listAllFinancialTransaction,
    findFinancialTransaction,editFinancialTransaction,removeFinancialTransaction
    } = financialTransactionServices;

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
});
const deleteFinancialTransaction = makeDeleteFinancialTransaction({
    removeFinancialTransaction,jwtVerifyToken
});

const  financialTransactionController = Object.freeze({
    createFinancialTransaction,getMonthlyTransactions,getAllFinancialTransaction,
    getFinancialTransactionById,updateFinancialTransaction,deleteFinancialTransaction
});

module.exports = financialTransactionController;