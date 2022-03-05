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
                } else if (cashOut.includes(type)) {
                    balance['Cash Out'] += balance[type]
                    balance[type] *= -1
                }
            }
            balance['amount'] = balance['Cash In'] - balance['Cash Out']
            balance['Cash Out'] *= -1
        }

        return { monthlyTransactions, monthlyBalance }

    },
    financialTransactionForm: () => {
        const date = new Date()
        const dayofMonth = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
        const monthofYear = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`

        return [
            {
                label: 'Description',
                id: 'description',
                type: 'text'
            },
            {
                label: 'Date',
                id: 'date',
                type: 'date',
                value: `${date.getFullYear()}-${monthofYear}-${dayofMonth}`,
                readOnly: true
            },
            {
                label: 'Amount',
                id: 'amount',
                type: 'number'
            },
            {
                label: 'Cash Flow',
                type: 'radio',
                id: 'cashFlow',
                choices: ['Cash In', 'Cash Out'],
            },
            {
                label: 'Type',
                id: 'type',
                options: [
                    'investment', 'revenue', 'other',
                    'wages', 'equipment', 'marketing'
                ],
                type: 'list'
            }
        ]
    }
}