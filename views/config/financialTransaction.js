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

            const cashIn = ['investment', 'revenue', 'other revenue']
            const cashOut = ['wages', 'other expenses', 'equipment']
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
                    'investment', 'revenue', 'otherRevenue',
                    'wages', 'equipment', 'otherExpenses'
                ],
                type: 'list'
            }
        ]
    },
    financialTransactionSingleView: (financialTransactionData) => {
        const { description, date, amount, cashFlow, type, referenceNum, createdOn, modifiedOn } = financialTransactionData

        const dateFormatCreate = new Date(createdOn)
        const dateFormatmodified = new Date(modifiedOn)
        const transactionData = new Date(date)

        const dateOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }

        return {
            Description: description,
            'Date': transactionData.toLocaleDateString('en-EN', dateOptions),
            Amount: amount,
            'Cash Flow': cashFlow,
            Type: type,
            'Reference Number': referenceNum,
            'Created Date': dateFormatCreate.toLocaleDateString('en-EN', dateOptions),
            'Modified Date': dateFormatmodified.toLocaleDateString('en-EN', dateOptions),

        }
    },
    transactionUpdateFormat: (transactionData) => [
        {
            label: 'Description',
            id: 'description',
            type: 'text'
        },
        {
            label: 'Amount',
            type: 'number',
            id: 'amount',
            readOnly: true
        },
        {
            label: 'Date',
            id: 'date',
            type: 'date',
            value: transactionData.date,
            readOnly: true
        },
        {
            label: 'Type',
            id: 'type',
            type: 'text',
            value: transactionData.type,
            readOnly: true
        },
        {
            label: 'Cash Flow',
            type: 'text',
            id: 'cashFlow',
            value: transactionData.cashFlow,
            readOnly: true
        },
    ],
    transactionUndoFormat: (transactionData) => {

        const date = new Date()
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        // const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        // const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

        let cashFlow, type
        if (transactionData.cashFlow == 'Cash In') {
            cashFlow = 'Cash Out'
            type = 'otherExpenses'


        } else if (transactionData.cashFlow == 'Cash Out') {
            cashFlow = 'Cash In'
            type = 'otherRevenue'
        }

        return [
            {
                label: 'Description',
                id: 'description',
                type: 'text',
                value: `Undo ${transactionData.description}`,

            },
            {
                label: 'Amount',
                type: 'number',
                id: 'amount',
                value: transactionData.amount,
                readOnly: true
            },
            {
                label: 'Date',
                id: 'date',
                type: 'date',
                value: `${date.getFullYear()}-${month}-${day}`,
                readOnly: true
            },
            {
                label: 'Type',
                id: 'type',
                type: 'text',
                value: type,
                readOnly: true
            },
            {
                label: 'Cash Flow',
                type: 'text',
                id: 'cashFlow',
                value: cashFlow,
                readOnly: true
            },
        ]
    }
}