const { makeFinancialTransaction } = require('../../models');
const makeAdjustFinancialBalance = require('./adjustFinancialBalance');

module.exports =
    function makeAddFinancialTransaction({ financialTransactionCollection, balanceTransactionCollection }) {

        return async function addFinancialTransaction(financialTransactionInfo) {

           try {
                const adjustFinancialBalance = makeAdjustFinancialBalance({ balanceTransactionCollection })
                const financialTransaction = makeFinancialTransaction(financialTransactionInfo)

                const createdFinancialTransaction = await financialTransactionCollection.insert({
                    description: financialTransaction.getDescription(),
                    date: financialTransaction.getDate(),
                    amount: financialTransaction.getAmount(),
                    cashFlow: financialTransaction.getCashFlow(),
                    type: financialTransaction.getType(),
                    referenceNum: financialTransaction.getReferenceNum(),
                    createdOn: financialTransaction.getCreatedOn(),
                    modifiedOn: financialTransaction.getModifiedOn()
                });

                const financialBalances = await adjustFinancialBalance(financialTransaction)

                return { createdFinancialTransaction, financialBalances }

            }catch(error){
                //future error logger
                console.log(error)
            }
        }
    }