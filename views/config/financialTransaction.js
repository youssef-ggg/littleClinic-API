module.exports = {

    monthlyFinancialTransaction: ({ monthylFinancialData }) => {

        const dateOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }

        const { monthlyBalance, monthlyTransactions } = monthylFinancialData;

        monthlyTransactions.forEach(transaction => {

            // use num= 5.67777 num.toFixed(2) = '5.68' 
            const dateFormat = new Date(transaction.date)
            transaction.date = dateFormat.toLocaleDateString('en-EN', dateOptions)

            if (transaction.cashFlow == 'Cash In') {
                transaction['Cash In'] = transaction.amount
                transaction['Cash Out'] = 0
                transaction[transaction.type] = parseFloat(transaction.amount)
            }
            else if (transaction.cashFlow == 'Cash Out') {
                transaction['Cash In'] = 0
                transaction['Cash Out'] = transaction.amount * -1
                transaction[transaction.type] = parseFloat(-transaction.amount)
                transaction.amount = transaction.amount * -1
            }
        })

        for (const balance of monthlyBalance) {

            const cashIn = ['investment', 'revenue', 'other']
            const cashOut = ['wages', 'marketing', 'equipment']
            const { id, description, date, referenceNum, createdOn, modifiedOn, ...types } = balance
            const dateFormat = new Date(balance.date)
            balance.date = dateFormat.toLocaleDateString('en-EN', dateOptions)
            balance['Cash In'] = 0
            balance['Cash Out'] = 0
            for (const type in types) {
                if (cashIn.includes(type)) {
                    balance['Cash In'] += balance[type]
                    console.log(balance['Cash In'])
                } else if (cashOut.includes(type)) {
                    balance['Cash Out'] += balance[type]
                    balance[type] *= -1
                }
            }
            balance['amount'] = balance['Cash In'] - balance['Cash Out']
            balance['Cash Out'] *= -1
        }

        return { monthlyTransactions, monthlyBalance }

    }
}