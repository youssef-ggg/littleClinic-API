module.exports = function makeAppointmentRouter({routes,makeCallBack,appointmentController}){

    const {
        createAppointment,
        getByPatientId
    } = appointmentController;

    routes.post('/appointment/addAppointment',makeCallBack(createAppointment));
    routes.get('/appointment/patient/:patientId',makeCallBack(getByPatientId));

    return routes;
}