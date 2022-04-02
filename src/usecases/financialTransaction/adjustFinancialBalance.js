const { makeBalanceTransaction } = require('../../models')

module.exports = function makeAdjustFinanialBalance({ balanceTransactionCollection }) {

    return async function adjustFinancialBalance(financialTransaction) {

        const dayOfTransaction = new Date(financialTransaction.getDate()).getDate()
        const monthOfTransaction = new Date(financialTransaction.getDate()).getMonth()
        const yearOfTransaction = new Date(financialTransaction.getDate()).getFullYear()

        let closingBalance = {}
        const type = financialTransaction.getType()

        const lastBalances = await balanceTransactionCollection.findLatestBalances()

        if (lastBalances.length > 0) {
            const lastBalanceDate = new Date(lastBalances[0].date)

            if (lastBalanceDate.getMonth() == monthOfTransaction
                && lastBalanceDate.getFullYear() == yearOfTransaction) {

                lastBalances[0][type] += financialTransaction.getAmount()
                const updateBalance = makeBalanceTransaction({
                    ...lastBalances[0]
                })
                const updatedBalance = await balanceTransactionCollection.update({
                    id: updateBalance.getId(),
                    description: updateBalance.getDescription(),
                    date: updateBalance.getDate(),
                    investment: updateBalance.getInvestment(),
                    revenue: updateBalance.getRevenue(),
                    otherRevenue: updateBalance.getOtherRevenue(),
                    wages: updateBalance.getWages(),
                    otherExpenses: updateBalance.getOtherExpenses(),
                    equipment: updateBalance.getEquipment(),
                    createdOn: updateBalance.getCreatedOn(),
                    modifiedOn: Date.now()
                })

                return updatedBalance
            }
            else {

                lastBalances[0][type] += financialTransaction.getAmount()
                closingBalance = makeBalanceTransaction({
                    description: 'Closing Balance',
                    date: new Date(yearOfTransaction, monthOfTransaction + 1, 0).getTime(),
                    investment: lastBalances[0].investment,
                    revenue: lastBalances[0].revenue,
                    otherRevenue: lastBalances[0].otherRevenue,
                    wages: lastBalances[0].wages,
                    equipment: lastBalances[0].equipment,
                    otherExpenses: lastBalances[0].otherExpenses
                })
            }
        } else {
            const fincancialTransactionType = {}
            fincancialTransactionType[type] = financialTransaction.getAmount()
            closingBalance = makeBalanceTransaction({
                description: 'Closing Balance',
                date: new Date(yearOfTransaction, monthOfTransaction + 1, 0).getTime(),
                ...fincancialTransactionType
            })
        }

        const insertedclosingBalance = await balanceTransactionCollection.insert({
            description: closingBalance.getDescription(),
            date: closingBalance.getDate(),
            investment: closingBalance.getInvestment(),
            revenue: closingBalance.getRevenue(),
            otherRevenue: closingBalance.getOtherRevenue(),
            wages: closingBalance.getWages(),
            otherExpenses: closingBalance.getOtherExpenses(),
            equipment: closingBalance.getEquipment(),
            createdOn: closingBalance.getCreatedOn(),
            modifiedOn: closingBalance.getModifiedOn()
        })

        return insertedclosingBalance

    }

}