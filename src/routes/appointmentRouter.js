module.exports = function makeAppointmentRouter({routes,makeCallBack,appointmentController}){

    const {
        createAppointment
    } = appointmentController;

    routes.post('/appointment/addAppointment',makeCallBack(createAppointment));

    return routes;
}