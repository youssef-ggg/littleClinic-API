const { makeBalanceTransaction } = require('../../models')

module.exports = function makeAdjustFinanialBalance({ balanceTransactionCollection }) {

    return async function adjustFinancialBalance(financialTransaction) {

        const dayOfTransaction = new Date(financialTransaction.getDate()).getDate()
        const monthOfTransaction = new Date(financialTransaction.getDate()).getMonth()
        const yearOfTransaction = new Date(financialTransaction.getDate()).getFullYear()

        const openingClosingBalances = []
        let startingBalance = makeBalanceTransaction({
            id:0,
            description: 'Opening Balance',
            date: new Date(yearOfTransaction, monthOfTransaction, 1).getTime(),
        })
        let closingBalance = {}
        const type = financialTransaction.getType()

        const lastBalances = await balanceTransactionCollection.findLatestBalances()

        if (lastBalances.length > 0) {
            const lastBalanceDate = new Date(lastBalances[0].date)

            if (lastBalanceDate.getMonth() == monthOfTransaction
                && lastBalanceDate.getFullYear() == yearOfTransaction) {

                if (lastBalances[1]) {
                    startingBalance = makeBalanceTransaction({
                        id:0,
                        description: 'Opening Balance',
                        date: new Date(yearOfTransaction, monthOfTransaction, 1).getTime(),
                        investment: lastBalances[1].investment,
                        revenue: lastBalances[1].revenue,
                        other: lastBalances[1].other,
                        wages: lastBalances[1].wages,
                        equipment: lastBalances[1].equipment,
                        marketing: lastBalances[1].marketing
                    })
                }
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
                    other: updateBalance.getOther(),
                    wages: updateBalance.getWages(),
                    marketing: updateBalance.getMarketing(),
                    equipment: updateBalance.getEquipment(),
                    createdOn: updateBalance.getCreatedOn(),
                    modifiedOn: Date.now()
                })

                return [{
                    id: startingBalance.getId(),
                    description: startingBalance.getDescription(),
                    date: startingBalance.getDate(),
                    investment: startingBalance.getInvestment(),
                    revenue: startingBalance.getRevenue(),
                    other: startingBalance.getOther(),
                    wages: startingBalance.getWages(),
                    marketing: startingBalance.getMarketing(),
                    equipment: startingBalance.getEquipment(),
                }, updatedBalance]
            }
            else {

                startingBalance = makeBalanceTransaction({
                    id:0,
                    description: 'Opening Balance',
                    date: new Date(yearOfTransaction, monthOfTransaction, 1).getTime(),
                    investment: lastBalances[0].investment,
                    revenue: lastBalances[0].revenue,
                    other: lastBalances[0].other,
                    wages: lastBalances[0].wages,
                    equipment: lastBalances[0].equipment,
                    marketing: lastBalances[0].marketing
                })

                lastBalances[0][type] += financialTransaction.getAmount()
                closingBalance = makeBalanceTransaction({
                    description: 'Closing Balance',
                    date: new Date(yearOfTransaction, monthOfTransaction + 1, 0).getTime(),
                    investment: lastBalances[0].investment,
                    revenue: lastBalances[0].revenue,
                    other: lastBalances[0].other,
                    wages: lastBalances[0].wages,
                    equipment: lastBalances[0].equipment,
                    marketing: lastBalances[0].marketing
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
            other: closingBalance.getOther(),
            wages: closingBalance.getWages(),
            marketing: closingBalance.getMarketing(),
            equipment: closingBalance.getEquipment(),
            createdOn:closingBalance.getCreatedOn(),
            modifiedOn:closingBalance.getModifiedOn()
        })

        return [{
            id: startingBalance.getId(),
            description: startingBalance.getDescription(),
            date: startingBalance.getDate(),
            investment: startingBalance.getInvestment(),
            revenue: startingBalance.getRevenue(),
            other: startingBalance.getOther(),
            wages: startingBalance.getWages(),
            marketing: startingBalance.getMarketing(),
            equipment: startingBalance.getEquipment()
        }, insertedclosingBalance]

    }

}