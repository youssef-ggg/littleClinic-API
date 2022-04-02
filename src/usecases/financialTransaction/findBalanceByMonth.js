const { makeBalanceTransaction } = require('../../models')

module.exports = function makeFindBalanceByMonth({ balanceTransactionCollection }) {

    return async function findBalanceByMonth({ month, year }) {

        const monthlyBalance = await balanceTransactionCollection.findByMonth({ month, year })
        const startOfMonth = new Date(year, month - 1, 1).getTime()
        const endOfMonth = new Date(year, month, 0).getTime()
        if (monthlyBalance.length == 2) {
            const monthlyBalanceDate = new Date(monthlyBalance[0].date)
            let openingBalance = {}
            if (monthlyBalanceDate.getFullYear() < year) {
                openingBalance = makeBalanceTransaction({
                    id: 0,
                    description: 'Opening Balance',
                    date: startOfMonth,
                    investment: monthlyBalance[0].investment,
                    revenue: monthlyBalance[0].revenue,
                    otherRevenue: monthlyBalance[0].otherRevenue,
                    wages: monthlyBalance[0].wages,
                    otherExpenses: monthlyBalance[0].otherExpenses,
                    equipment: monthlyBalance[0].equipment,
                })
            }
            else if (monthlyBalanceDate.getFullYear() <= year && monthlyBalanceDate.getMonth() + 1 < month) {
                openingBalance = makeBalanceTransaction({
                    id: 0,
                    description: 'Opening Balance',
                    date: startOfMonth,
                    investment: monthlyBalance[0].investment,
                    revenue: monthlyBalance[0].revenue,
                    otherRevenue: monthlyBalance[0].otherRevenue,
                    wages: monthlyBalance[0].wages,
                    otherExpenses: monthlyBalance[0].otherExpenses,
                    equipment: monthlyBalance[0].equipment,
                })
            } else {
                openingBalance = makeBalanceTransaction({
                    id: 0,
                    description: 'Opening Balance',
                    date: startOfMonth,
                    investment: monthlyBalance[1].investment,
                    revenue: monthlyBalance[1].revenue,
                    otherRevenue: monthlyBalance[1].otherRevenue,
                    wages: monthlyBalance[1].wages,
                    otherExpenses: monthlyBalance[1].otherExpenses,
                    equipment: monthlyBalance[1].equipment,
                })
            }

            return [
                {
                    id: openingBalance.getId(),
                    description: openingBalance.getDescription(),
                    date: openingBalance.getDate(),
                    investment: openingBalance.getInvestment(),
                    revenue: openingBalance.getRevenue(),
                    otherRevenue: openingBalance.getOtherRevenue(),
                    wages: openingBalance.getWages(),
                    otherExpenses: openingBalance.getOtherExpenses(),
                    equipment: openingBalance.getEquipment(),
                    createdOn: openingBalance.getCreatedOn(),
                    modifiedOn: openingBalance.getModifiedOn()
                },
                {
                    ...monthlyBalance[0], date: endOfMonth
                }
            ]

        } else if (monthlyBalance.length == 1) {

            const monthlyBalanceDate = new Date(monthlyBalance[0].date)
            let openingBalance = {}
            if (monthlyBalanceDate.getFullYear() <= year && monthlyBalanceDate.getMonth() + 1 < month) {
                openingBalance = makeBalanceTransaction({
                    id: 0,
                    description: 'Opening Balance',
                    date: startOfMonth,
                    investment: monthlyBalance[0].investment,
                    revenue: monthlyBalance[0].revenue,
                    otherRevenue: monthlyBalance[0].otherRevenue,
                    wages: monthlyBalance[0].wages,
                    otherExpenses: monthlyBalance[0].otherExpenses,
                    equipment: monthlyBalance[0].equipment,
                })
            }
            else {
                openingBalance = makeBalanceTransaction({
                    id: 0,
                    description: 'Opening Balance',
                    date: startOfMonth,
                })
            }
            return [
                {
                    id: openingBalance.getId(),
                    description: openingBalance.getDescription(),
                    date: openingBalance.getDate(),
                    investment: openingBalance.getInvestment(),
                    revenue: openingBalance.getRevenue(),
                    otherRevenue: openingBalance.getOtherRevenue(),
                    wages: openingBalance.getWages(),
                    otherExpenses: openingBalance.getOtherExpenses(),
                    equipment: openingBalance.getEquipment(),
                    createdOn: openingBalance.getCreatedOn(),
                    modifiedOn: openingBalance.getModifiedOn()
                },
                {
                    ...monthlyBalance[0], date: endOfMonth
                }
            ]
        } else {
            const openingBalance = makeBalanceTransaction({
                id: 0,
                description: 'Opening Balance',
                date: startOfMonth,
            })

            const closingBalance = makeBalanceTransaction({
                id: 0,
                description: 'Closing Balance',
                date: startOfMonth,
            })
            return [
                {
                    id: openingBalance.getId(),
                    description: openingBalance.getDescription(),
                    date: startOfMonth,//openingBalance.getDate(),
                    investment: openingBalance.getInvestment(),
                    revenue: openingBalance.getRevenue(),
                    otherRevenue: openingBalance.getOtherRevenue(),
                    wages: openingBalance.getWages(),
                    otherExpenses: openingBalance.getOtherExpenses(),
                    equipment: openingBalance.getEquipment(),
                    createdOn: openingBalance.getCreatedOn(),
                    modifiedOn: openingBalance.getModifiedOn()
                },
                {
                    id: closingBalance.getId(),
                    description: closingBalance.getDescription(),
                    date: endOfMonth,//closingBalance.getDate(),
                    investment: closingBalance.getInvestment(),
                    revenue: closingBalance.getRevenue(),
                    otherRevenue: closingBalance.getOtherRevenue(),
                    wages: closingBalance.getWages(),
                    otherExpenses: closingBalance.getOtherExpenses(),
                    equipment: closingBalance.getEquipment(),
                    createdOn: closingBalance.getCreatedOn(),
                    modifiedOn: closingBalance.getModifiedOn()
                }
            ]
        }
    }
}