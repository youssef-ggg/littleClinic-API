module.exports = function makeAppointmentRouter({routes,makeCallBack,appointmentController}){

    const {
        createAppointment,
        getAppointmentById,
        getByPatientId,

    } = appointmentController;

    routes.post('/appointment/addAppointment',makeCallBack(createAppointment));
    routes.get('/appointment/patient/:patientId',makeCallBack(getByPatientId));
    routes.get('/appointment/getAppointment/:id',makeCallBack(getAppointmentById));

    return routes;
}