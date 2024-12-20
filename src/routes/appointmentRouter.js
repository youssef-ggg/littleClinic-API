module.exports = function makeAppointmentRouter({routes,makeCallBack,appointmentController}){

    const {
        createAppointment,
        getAppointmentById,
        getByPatientId,
        updateAppointment,
        getByDateDuration,
        deleteSingleAppointment

    } = appointmentController;

    routes.post('/appointment/addAppointment',makeCallBack(createAppointment));
    routes.get('/appointment/patient/:patientId',makeCallBack(getByPatientId));
    routes.get('/appointment/getAppointment/:id',makeCallBack(getAppointmentById));
    routes.get('/appointment/appointmentsDuration/:startEndDates',makeCallBack(getByDateDuration));
    routes.patch('/appointment/updateAppointment/:id',makeCallBack(updateAppointment));
    routes.delete('/appointment/delete/:id',makeCallBack(deleteSingleAppointment));
    
    return routes;
}