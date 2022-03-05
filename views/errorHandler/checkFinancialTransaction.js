module.exports = function financialTransactionErrorHandler({ commonInputError, renderFormError }) {

    function createTransactionErrorHandler(transactionData) {

        let hasError = false
        const  {invalidEmptyInputHandler} = commonInputError()
        const { description, amount, type, date, cashFlow } = transactionData
        const cashIn = ['investment', 'revenue', 'other']
        const cashOut = ['wages', 'equipment', 'marketing']


        
        if (invalidEmptyInputHandler({ description, amount })) {
            hasError = true;
        }

        if (cashFlow == null || cashFlow == '') {
            renderFormError({
                inputTitle: 'cashFlow',
                message: 'Must have a cash flow.',
                inputType: 'radio'
            })
            hasError = true
        }

        if (cashFlow == 'Cash In' && cashOut.includes(type)) {
            hasError = true
            renderFormError({
                inputTitle: 'type',
                message: 'Cash Out type can\'t be labeled as Cash In type.',
                inputType: 'text'
            })
        }
        else if (cashFlow == 'Cash Out' && cashIn.includes(type)) {
            hasError = true
            renderFormError({
                inputTitle: 'type',
                message: 'Cash In type can\'t be labeled as Cash Out type.',
                inputType: 'text'
            })
        }

        return hasError
    }

    function createBillErrorHandler(transactionData){

        let hasError = false
        const  {invalidEmptyInputHandler} = commonInputError()
        const { description, amount} = transactionData
        
        if(isNaN(amount)){
            renderFormError({
                inputTitle: 'amount',
                message: 'Amount must be a number.',
                inputType: 'text'
            })
            hasError = true
        }
        if (invalidEmptyInputHandler({ description, amount })) {
            hasError = true
        }

        return hasError
    }

    return {
        createTransactionErrorHandler,createBillErrorHandler
    }
}