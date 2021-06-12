const {financialTransactionCollection} = require('../../dataAcces');

const makeAddFinancialTransaction = require('./addFinancialTransaction');
const makeListAllFinancialTransaction = require('./listAllFinancialTransaction');

const addFinancialTransaction = makeAddFinancialTransaction({financialTransactionCollection});
const listAllFinancialTransaction = makeListAllFinancialTransaction({financialTransactionCollection});

module.exports = {
    addFinancialTransaction,listAllFinancialTransaction
};