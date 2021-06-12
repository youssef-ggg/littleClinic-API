
module.exports = function makeListAllFinancialTransaction({financialTransactionCollection}){

    return async function listAllFinancialTRansaction(){

        return await financialTransactionCollection.findAll();
    }

}