module.exports = 
    function makeFinancialTransactionRouter({routes,makeCallBack,financialTransactionController}){

        const {
            createFinancialTransaction,
            getMonthlyTransactions,
            getAllFinancialTransaction

        } = financialTransactionController;

        //invstegate using query vs params
        routes.post('/financialTransaction/addTransaction',makeCallBack(createFinancialTransaction));
        routes.get('/financialTransaction/listMonthly/:monthyear',makeCallBack(getMonthlyTransactions));
        routes.get('/financialTransaction/listAll',makeCallBack(getAllFinancialTransaction));

        return routes;
}