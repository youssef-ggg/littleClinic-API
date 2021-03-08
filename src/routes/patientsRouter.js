module.exports = function makePatientsRouter({routes,makeCallBack,patientController})
{
    const 
    {
        getPatientsList,
        createPatient,
        getPatientByID,
        getNumberOfPatients,
        setUpdatePatient
    } = patientController;

    routes.get('/patients/listAll',makeCallBack(getPatientsList));
    routes.post('/patients/addPatient',makeCallBack(createPatient));
    routes.get('/patients/patientCount',makeCallBack(getNumberOfPatients));
    routes.get('/patients/all/:id',makeCallBack(getPatientByID));
    routes.patch('/patients/edit/:id',makeCallBack(setUpdatePatient));


    return routes;
}