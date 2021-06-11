module.exports = function buildMakeFinancialTransaction(){

    return function makeFinancialTransaction(
    {
        id,
        description,
        date,
        amount,
        cashFlow,
        type,
        referenceNum,
        createdOn = Date.now(),
        modifiedOn = Date.now(),
            
    }= {}) {

        if(!description){
            throw new Error('Transaction must have a description');
        }
        if(!date){
            throw new Error('Transaction must have a date');
        }
        if(!amount){
            throw new Error('Transaction must have an amount');
        }
        if(!cashFlow){
            throw new Error('Transaction cash flow must have a value')
        }

        return Object.freeze({
            getId:()=>id,
            getDescription:()=>description,
            getDate:()=>date,
            getAmount:()=>amount,
            getCashFlow:()=>cashFlow,
            getType:()=>type,
            getReferenceNum:()=>referenceNum,
            getCreatedOn:()=>createdOn,
            getModifiedOn:()=>modifiedOn

        });
    
    }

}