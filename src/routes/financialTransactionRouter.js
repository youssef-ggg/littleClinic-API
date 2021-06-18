module.exports = 
    function makeFinancialTransactionRouter({routes,makeCallBack,financialTransactionController}){

        const {

            createFinancialTransaction,
            

        } = financialTransactionController;


        routes.post('/financialTransaction/addTransaction',makeCallBack(createFinancialTransaction));

        return routes;
}