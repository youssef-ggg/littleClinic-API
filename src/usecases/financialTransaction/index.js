const {financialTransactionCollection} = require('../../dataAcces');

const makeAddFinancialTransaction = require('./addFinancialTransaction');
const makeListAllFinancialTransaction = require('./listAllFinancialTransaction');
const makeListMonthlyFinancialTransaction =  require('./listMonthlyFinancialTransaction');

const addFinancialTransaction = makeAddFinancialTransaction({financialTransactionCollection});
const listAllFinancialTransaction = makeListAllFinancialTransaction({financialTransactionCollection});
const listMonthlyFinancialTransaction = 
    makeListMonthlyFinancialTransaction({financialTransactionCollection});

module.exports = {
    addFinancialTransaction,listAllFinancialTransaction,listMonthlyFinancialTransaction
};