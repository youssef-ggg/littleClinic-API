const makeFindBalanceByMonth = require('./findBalanceByMonth')

module.exports = function makeListMonthlyFinancialTransaction(
    { financialTransactionCollection, balanceTransactionCollection }) {

    return async function listMonthlyFinancialTransaction({ month, year }) {

        const findBalanceByMonth = makeFindBalanceByMonth({balanceTransactionCollection})
        const monthlyTransactions =  await financialTransactionCollection.findByMonth({ month, year })
        const monthlyBalance = await findBalanceByMonth({month,year})

        return {monthlyTransactions,monthlyBalance}
    }
}