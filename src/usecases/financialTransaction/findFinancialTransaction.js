module.exports = function makeFindFinancialTransaction({financialTransactionCollection}){

    return async function findFinancialTransaction({id}){

        if(!id){
            throw new Error('You must supply an id.');
        }
        return await financialTransactionCollection.findById({id});
    }
}