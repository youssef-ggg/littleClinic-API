const path = require('path');

const {app,BrowserWindow,ipcMain} = require('electron');
const userController = "require('./src/controllers/users/index')";
const patientController = "require('./src/controllers/patients/index')";
const diagnosisController = "require('./src/controllers/diagnosis/index')";
const appointmentController  = "require('./src/controllers/appointment/index')";

var window; 


function createWindow(){
    window = new BrowserWindow({
        width: 1000,
        height: 600,
        icon:path.join(__dirname,'/assets/images/icons/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            
        }
    });

    // window.removeMenu();
    window.loadFile('./pages/login/login.html');
}

//user Events
app.whenReady().then(createWindow);

ipcMain.on('registerUser',async function(event,userData){
    
    const {registerUser} = userController;
    const result = await registerUser(userData);
    

    if(result.error){
         event.sender.send('error',result.error);
    }
    else {    
        window.loadFile('./views/pages/dashboard/dashboard.html');
    
    }
});

ipcMain.on('login',function(event,data){
    window.loadFile('./pages/dashboard/dashboard.html');
});

ipcMain.on('logout',function(event){//needs work
    window.loadFile('./pages/login/login.html');  
});

ipcMain.on('reqUser',async function(event,userData){
    const  {getUser} = userController;
    const {id} = userData;
    const user = await getUser(id);
    event.sender.send('userSingleView',user);
})

//patient Events

ipcMain.on('requestPatientsPage',async function(event,pageData){
    const {pageNum,pageSize} = pageData;
    const {listPatientsPaginated} = patientController;
    const patientData = await listPatientsPaginated(pageNum,pageSize);
    event.sender.send('patientListPaginated',patientData);
});

//Appointment Events
ipcMain.on('getApntmntsThisWeek',async function(event,{startDate}){

    const weekDuration = 6;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate()+weekDuration)
    startDate.setHours(0,0,0);
    endDate.setHours(23,59,59);
    const {getByDateDuration} = appointmentController;
    const result  = await getByDateDuration({startDate,endDate});
    event.sender.send('appointmentByDuration',{appointmentList:result,startDate,endDate});
});

ipcMain.on('updateAppointment',async function(event,appointmentData){
    const {setUpdateAppointment}  = appointmentController;
    const result = await setUpdateAppointment(appointmentData);

    const id = appointmentData.id;
    const {getAppointmentById} = appointmentController;
    const appointment = await getAppointmentById(id);
    event.sender.send('appointmentSingleView',appointment[0]);
    event.sender.send('updateSuccess',{message:'Appointment updated successfully.',state:'success'});

});

//maybe refactor later not to go back to db 
ipcMain.on('reqAppointment',async function(event,appointmentData){
    const id = appointmentData.id;
    const {getAppointmentById} = appointmentController;
    const appointment = await getAppointmentById(id);
    event.sender.send('appointmentSingleView',appointment[0]);
});

ipcMain.on('reqActiveAppPatientID',async function(event,singlePatient){
    const {getByPatientIdActive} =appointmentController;
    const appointmentList = await getByPatientIdActive(singlePatient.id);
    event.sender.send('appointmentList',{singlePatient,appointmentList})
});

ipcMain.on('reqPastAppPatientID',async function(event,singlePatient){
    const {getByPatientIdDue} =appointmentController;
    const appointmentList = await getByPatientIdDue(singlePatient.id);
    event.sender.send('appointmentList',{singlePatient,appointmentList})
});

ipcMain.on('deleteAppointment',async function(event,appointmetData){

    const {deleteSingleAppointment} = appointmentController;
    const result = await deleteSingleAppointment(appointmetData);    
    event.sender.send('updateSuccess',{message:'Appointment Deleted Successfully.',state:'success-warn'});

});
