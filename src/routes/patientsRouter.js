module.exports = function makePatientsRouter({routes,makeCallBack,patientController})
{
    const {getPatientLists,createPatient,getPatientByID,getNumberOfPatients,
        setUpdatePatient} = patientController;

    routes.get('/list',makeCallBack(getPatientLists));
    routes.post('/addPatient',makeCallBack(createPatient));
    routes.get('/patientCount',makeCallBack(getNumberOfPatients));
    routes.get('/:id',makeCallBack(getPatientByID));
    routes.patch('/:id',makeCallBack(setUpdatePatient));


    return routes;
}