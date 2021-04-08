module.exports = function makeDiagnosisRouter({routes,makeCallBack,diagnosisController}){

    const {

        createDiagnosis,
        getByPatientId,
        getDiagnosisById,
        deleteSingleDiangosis,

    } = diagnosisController;

    //routing need more bux fixes betwwen query and params
    routes.post('/patients/diagnosis/addDiagnosis',makeCallBack(createDiagnosis));
    routes.get('/patients/diangosis/:patientId',makeCallBack(getByPatientId));
    routes.get('/patients/getDiagnosis/:id',makeCallBack(getDiagnosisById));
    routes.delete('/patients/diagnosis/delete/:id',makeCallBack(deleteSingleDiangosis));

    return routes;
}