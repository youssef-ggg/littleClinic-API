module.exports = function makePatientsRouter({routes,makeCallBack,patientController})
{
    const 
    {
        getPatientsList,
        createPatient,
        getPatientByID,
        getNumberOfPatients,
        updatePatient,
        getPatientsPaginated
    } = patientController;

    routes.get('/patients/listAll',makeCallBack(getPatientsList));
    routes.post('/patients/addPatient',makeCallBack(createPatient));
    routes.get('/patients/list/:pageNum&:pageSize',makeCallBack(getPatientsPaginated));
    routes.get('/patients/patientCount',makeCallBack(getNumberOfPatients));
    routes.get('/patients/:id',makeCallBack(getPatientByID));
    routes.patch('/patients/edit/:id',makeCallBack(updatePatient));


    return routes;
}