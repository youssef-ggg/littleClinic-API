const {financialTransactionCollection} = require('../../dataAcces');

const makeAddFinancialTransaction = require('./addFinancialTransaction');

const addFinancialTransaction = makeAddFinancialTransaction(financialTransactionCollection);


module.exports = {
    addFinancialTransaction
};