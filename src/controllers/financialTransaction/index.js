const {jwtVerifyToken} = require('../../jwtAuthorization')

const financialTransactionServices = require('../../usecases/financialTransaction/index');

const makeCreateFinancialTransaction = require('./createFinancialTransaction');

const {addFinancialTransaction} = financialTransactionServices;

const createFinancialTransaction = makeCreateFinancialTransaction({addFinancialTransaction,jwtVerifyToken});

const  financialTransactionController = Object.freeze({
    createFinancialTransaction 
});

module.exports = financialTransactionController;