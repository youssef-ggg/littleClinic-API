
module.exports = function makeListAllFinancialTransaction({financialTransactionCollection}){

    return async function listAllFinancialTransaction(){

        return await financialTransactionCollection.findAll();
    }

}