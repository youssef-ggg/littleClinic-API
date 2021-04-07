module.exports = function makeDiagnosisRouter({routes,makeCallBack,diagnosisController}){

    const {

        createDiagnosis,
        getByPatientId,
        getDiagnosisById
    } = diagnosisController;

    routes.post('/patients/diagnosis/addDiagnosis',makeCallBack(createDiagnosis));
    //routing need more bux fixes betwwen query and params
    routes.get('/patients/diangosis/:patientId',makeCallBack(getByPatientId));
    routes.get('/patients/getDiagnosis/:id',makeCallBack(getDiagnosisById));

    return routes;
}