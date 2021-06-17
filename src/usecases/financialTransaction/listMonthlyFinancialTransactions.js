module.exports = function makeListMonthlyFinancialTransaction({financialTransactionCollection}){

    return async function listMonthlyFinancialTransactions({month,year}){
        
        return await financialTransactionCollection.findByMonth({month,year});
    }
}