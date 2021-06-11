const {makeFinancialTransaction} = require('../../models');

module.exports = function makeAddFinancialTransaction({financialTransactionCollection}){

    return async function addFinancialTransaction(financialTransactionInfo){

        const financialTransaction = makeFinancialTransaction(financialTransactionInfo);

        return financialTransactionCollection.insert({
            description:financialTransaction.getDescription(),
            date:financialTransaction.getDate(),
            amount:financialTransaction.getAmount(),
            cashFlow:financialTransaction.getCashFlow(),
            type:financialTransaction.getType(),
            referenceNum:financialTransaction.getReferenceNum(),
            createdOn:financialTransaction.getCreatedOn(),
            modifiedOn:financialTransaction.getModifiedOn()
        });

    }
}