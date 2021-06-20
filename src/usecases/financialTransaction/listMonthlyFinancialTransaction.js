module.exports = function makeListMonthlyFinancialTransaction({financialTransactionCollection}){

    return async function listMonthlyFinancialTransaction({month,year}){
        
        return await financialTransactionCollection.findByMonth({month,year});
    }
}