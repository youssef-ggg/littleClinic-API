const { makeBalanceTransaction } = require('../../models')

module.exports = function makeFindBalanceByMonth({ balanceTransactionCollection }) {

    return async function findBalanceByMonth({ month, year }) {

        const monthlyBalance = await balanceTransactionCollection.findByMonth({ month, year })

        if (monthlyBalance.length == 2) {
            const openingBalance = makeBalanceTransaction({
                id: 0,
                description: 'Opening Balance',
                date: new Date(year, month - 1, 1).getTime(),
                investment: monthlyBalance[1].investment,
                revenue: monthlyBalance[1].revenue,
                other: monthlyBalance[1].other,
                wages: monthlyBalance[1].wages,
                marketing: monthlyBalance[1].marketing,
                equipment: monthlyBalance[1].equipment,
            })

            return [
                {
                    id: openingBalance.getId(),
                    description: openingBalance.getDescription(),
                    date: openingBalance.getDate(),
                    investment: openingBalance.getInvestment(),
                    revenue: openingBalance.getRevenue(),
                    other: openingBalance.getOther(),
                    wages: openingBalance.getWages(),
                    marketing: openingBalance.getMarketing(),
                    equipment: openingBalance.getEquipment(),
                    createdOn: openingBalance.getCreatedOn(),
                    modifiedOn: openingBalance.getModifiedOn()
                },
                {
                    ...monthlyBalance[0]
                }
            ]

        } else if (monthlyBalance.length == 1) {
            const startOfMonth = new Date(year, month - 1, 1).getTime()
            const openingBalance = makeBalanceTransaction({
                id: 0,
                description: 'Opening Balance',
                date: startOfMonth,
            })
            return [
                {
                    id: openingBalance.getId(),
                    description: openingBalance.getDescription(),
                    date: openingBalance.getDate(),
                    investment: openingBalance.getInvestment(),
                    revenue: openingBalance.getRevenue(),
                    other: openingBalance.getOther(),
                    wages: openingBalance.getWages(),
                    marketing: openingBalance.getMarketing(),
                    equipment: openingBalance.getEquipment(),
                    createdOn: openingBalance.getCreatedOn(),
                    modifiedOn: openingBalance.getModifiedOn()
                },
                {
                    ...monthlyBalance[0]
                }
            ]
        } else {
            const openingBalance = makeBalanceTransaction({
                id: 0,
                description: 'Opening Balance',
                date: new Date(year, month - 1, 1).getTime(),
            })

            const closingBalance = makeBalanceTransaction({
                id: 0,
                description: 'Closing Balance',
                date: new Date(year, month + 1, 0).getTime(),
            })
            return [
                {
                    id: openingBalance.getId(),
                    description: openingBalance.getDescription(),
                    date: openingBalance.getDate(),
                    investment: openingBalance.getInvestment(),
                    revenue: openingBalance.getRevenue(),
                    other: openingBalance.getOther(),
                    wages: openingBalance.getWages(),
                    marketing: openingBalance.getMarketing(),
                    equipment: openingBalance.getEquipment(),
                    createdOn: openingBalance.getCreatedOn(),
                    modifiedOn: openingBalance.getModifiedOn()
                },
                {
                    id: closingBalance.getId(),
                    description: closingBalance.getDescription(),
                    date: closingBalance.getDate(),
                    investment: closingBalance.getInvestment(),
                    revenue: closingBalance.getRevenue(),
                    other: closingBalance.getOther(),
                    wages: closingBalance.getWages(),
                    marketing: closingBalance.getMarketing(),
                    equipment: closingBalance.getEquipment(),
                    createdOn: closingBalance.getCreatedOn(),
                    modifiedOn: closingBalance.getModifiedOn()
                }
            ]
        }
    }
}