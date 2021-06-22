const {makeFinancialTransaction} = require('../../models');

module.exports = function makeEditFinancialTransaction({financialTransactionCollection}){

    return async function editFinancialTransaction(transactionData){

        if (!transactionData.id) {
            throw new Error('You must supply an id.');
        }

        const financialTransaction = makeFinancialTransaction(transactionData);

        const exists = await financialTransactionCollection.findById({id:transactionData.id});
        if (!exists){
            throw new Error('This transaction doesn\'t exist.');
        }
        return financialTransactionCollection.update({
            id:financialTransaction.getId(),
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