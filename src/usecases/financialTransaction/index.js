const {financialTransactionCollection} = require('../../dataAcces');

const makeAddFinancialTransaction = require('./addFinancialTransaction');
const makeListAllFinancialTransaction = require('./listAllFinancialTransaction');
const makeListMonthlyFinancialTransaction =  require('./listMonthlyFinancialTransaction');
const makeFindFinancialTransaction = require('./findFinancialTransaction');
const makeEditFinancialTransaction = require('./editFinancialTransaction');

const addFinancialTransaction = makeAddFinancialTransaction({financialTransactionCollection});
const listAllFinancialTransaction = makeListAllFinancialTransaction({financialTransactionCollection});
const listMonthlyFinancialTransaction = 
    makeListMonthlyFinancialTransaction({financialTransactionCollection});
const findFinancialTransaction = makeFindFinancialTransaction({financialTransactionCollection});
const editFinancialTransaction = makeEditFinancialTransaction({financialTransactionCollection});

const financialTransactionServices =  Object.freeze({
    addFinancialTransaction,listAllFinancialTransaction,listMonthlyFinancialTransaction,
    findFinancialTransaction,editFinancialTransaction
});

module.exports = financialTransactionServices;