module.exports = function makeDiagnosisRouter({routes,makeCallBack,diagnosisController}){

    const {

        createDiagnosis
    } = diagnosisController;

    routes.post('/patients/diagnosis/addDiagnosis',makeCallBack(createDiagnosis));

    return routes;
}