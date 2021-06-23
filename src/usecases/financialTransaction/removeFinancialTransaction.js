const makeFinancialTransaction = require('../../models/financialTransaction');

module.exports = function makeRemoveFinancialTransaction({financialTransactionCollection}){

    return async function removeFinancialTransaction({id}){

        if(!id){
            return {
                deletedCount:0,
                message:'You must supply an id for a Financial Transaction.'
            }
        }
        const exists = await financialTransactionCollection.findById({id});

        if(!exists){
            return {
                deletedCount:0,
                message:'Financial Transaction not found, nothing to delete.'
            }
        }

        const deletedCount = await financialTransactionCollection.removeById({id});
        return {
            deletedCount,
            message:'Financial Transaction deleted successfully.'
        }
    }
}