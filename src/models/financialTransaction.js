
module.exports = function buildMakeFinancialTransaction({ typeEnum }) {

    function generateRefNumber() {
        const date = new Date()
        return date.getSeconds() + date.getMinutes() + date.getHours() +
            date.getDate() + date.getMonth() + date.getYear()
    }
    
    return function makeFinancialTransaction(
        {
            id,
            description,
            date,
            amount,
            cashFlow,
            type,
            referenceNum = generateRefNumber(),
            createdOn = Date.now(),
            modifiedOn = Date.now(),
        } = {}) {

        if (!description) {
            throw new Error('Transaction must have a description');
        }
        if (!date) {
            throw new Error('Transaction must have a date');
        }
        if (!amount) {
            throw new Error('Transaction must have an amount');
        }
        if (!cashFlow) {
            throw new Error('Transaction cash flow must have a value')
        }

        if (!type) {
            throw new Error('Transaction must have a type')
        }

        if (!typeEnum.includes(type)) {
            throw new Error('Transaction type has invalid value')
        }

        return Object.freeze({
            getId: () => id,
            getDescription: () => description,
            getDate: () => date,
            getAmount: () => amount,
            getCashFlow: () => cashFlow,
            getType: () => type,
            getReferenceNum: () => referenceNum,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn

        });

    }

}