module.exports = 
    function makeFinancialTransactionRouter({routes,makeCallBack,financialTransactionController}){

        const {
            createFinancialTransaction,
            getMonthlyTransactions

        } = financialTransactionController;

        //invstegate using query vs params
        routes.post('/financialTransaction/addTransaction',makeCallBack(createFinancialTransaction));
        routes.get('/financialTransaction/listMonthly/:monthyear',makeCallBack(getMonthlyTransactions));

        return routes;
}