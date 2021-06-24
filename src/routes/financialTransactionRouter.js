module.exports = 
    function makeFinancialTransactionRouter({routes,makeCallBack,financialTransactionController}){

        const {
            createFinancialTransaction,
            getMonthlyTransactions,
            getAllFinancialTransaction,
            getFinancialTransactionById,
            updateFinancialTransaction

        } = financialTransactionController;

        //invstegate using query vs params
        routes.post('/financialTransaction/addTransaction',makeCallBack(createFinancialTransaction));
        routes.get('/financialTransaction/listMonthly/:monthyear',makeCallBack(getMonthlyTransactions));
        routes.get('/financialTransaction/listAll',makeCallBack(getAllFinancialTransaction));
        routes.get('/financialTransaction/:id',makeCallBack(getFinancialTransactionById));
        routes.patch('/financialTransaction/updateTransaction/:id',makeCallBack(updateFinancialTransaction));

        return routes;
}