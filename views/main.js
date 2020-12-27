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
ipcMain.on('requestPatients',async function(event,paginationData){
    const {getPatientsList,getNumberOfPatients,listPatientsPaginated} = patientController;
    const numberOfPatients = await getNumberOfPatients();
    const {pageNum,pageSize} = paginationData;
    let patientsData = [];

    if(numberOfPatients<=pageSize)
        patientsData = await getPatientsList();
    else
        patientsData = await listPatientsPaginated(pageNum,pageSize);
    
        paginationData['numberOfPatients'] = numberOfPatients;
    event.sender.send('patientList',{patientsData,paginationData});
});

ipcMain.on('requestPatientsPage',async function(event,pageData){
    const {pageNum,pageSize} = pageData;
    const {listPatientsPaginated} = patientController;
    const patientData = await listPatientsPaginated(pageNum,pageSize);
    event.sender.send('patientListPaginated',patientData);
});

ipcMain.on('createPatient',async function(event,patientData){
    const {createPatient,getPatientByID} = patientController;
    const patientResult = await createPatient(patientData);
    const {id} = patientResult;
    const patient = await getPatientByID(id);
    event.sender.send('patientFormView',patient);
    event.sender.send('updateSuccess',{message:'Patient created Successfully.',state:'success'});
});

ipcMain.on('reqPatient',async function(event,patientData){

    const {getPatientByID} = patientController;
    const {id} = patientData;
    const patient = await getPatientByID(id);
    event.sender.send('patientFormView',patient);
});

ipcMain.on('updatePatient', async function (event,PatientDta){

    const {setUpdatePatient,getPatientByID} = patientController;
    const result = await setUpdatePatient(PatientDta);

    const id = PatientDta.id;
    const patient = await getPatientByID(id);
    event.sender.send('patientFormView',patient);
    event.sender.send('updateSuccess',{message:'Patient updated Successfully.',state:'success'});
});

//Diagnosis events
ipcMain.on('createDiagnosis',async function(event,diagnosisData){
   const {createDiagnosis} = diagnosisController;
   const diagnosisResult = await createDiagnosis(diagnosisData);
   event.sender.send('diagnosisSingleView',diagnosisResult);
   event.sender.send('updateSuccess',{message:'Diagnosis created Successfully.',state:'success'});

});

ipcMain.on('reqDiagnosis',async function(event,diagnosisData){
    const id = diagnosisData.id;
    const {getDiagnosisById} = diagnosisController;
    const diagnosis = await getDiagnosisById(id);
    event.sender.send('diagnosisSingleView',diagnosis[0]);
});

ipcMain.on('reqPatientDiagnosisLog',async function(event,singlePatient){
    const {getByPatientId} = diagnosisController;
    const diagnosisList = await getByPatientId(singlePatient.id);
    event.sender.send('diagnosisList',{singlePatient,diagnosisList});
});

ipcMain.on('UpdateDiagnosis',async function(event,diagnosisData){
    const {setUpdateDiagnosis}  = diagnosisController;
    const result = await setUpdateDiagnosis(diagnosisData);

    const id = diagnosisData.id;
    const {getDiagnosisById} = diagnosisController;
    const diagnosis = await getDiagnosisById(id);
    event.sender.send('diagnosisSingleView',diagnosis[0]);
    event.sender.send('updateSuccess',{message:'Diagnosis updated Successfully.',state:'success'});

});

ipcMain.on('deleteDiagnosis',async function(event,diagnosisData){

    const {deleteSingleDiangosis} = diagnosisController;
    const result = await deleteSingleDiangosis(diagnosisData);    
    event.sender.send('updateSuccess',{message:'Diagnosis Deleted Successfully.',state:'success-warn'});

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

ipcMain.on('createAppointment',async function(event,appointment){

    const {createAppointment} = appointmentController;
    const result = await createAppointment(appointment);
    event.sender.send('updateSuccess',{message:'appointment Created Successfully.',state:'success'});
    event.sender.send('appointmentSingleView',result);
});

ipcMain.on('reqPatientAppointmentLog',async function(event,singlePatient){
    const {getByPatientId} = appointmentController;
    const appointmentList = await getByPatientId(singlePatient.id);
    event.sender.send('appointmentList',{singlePatient,appointmentList});
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
