const {ipcRenderer} = require('electron');
const axios = require('axios');

const renderTable = require('../../components/table');
const {renderActions,rendertableAction,renderApntmntTableActions} = require('../../components/actions');
const renderForm = require('../../components/form');
const renderUnitView = require('../../components/unitView');
const renderUpdateForm = require('../../components/updateForm');
const renderAppointmentsTable = require('../../components/appointmentTable');
const {tabs,clearLeftNav} = require('../../components/leftNav');
const errorHandlerService = require('../../errorHandler');
const dashboardFormInputReader = require('../../inputHandler/dashboard/formInputHandler');
//CRUD Requests
const createRequest = require('../../requests/createRequest');
const updateRequest = require('../../requests/updateRequest');
const getByQueryRequest = require('../../requests/getByQueryRequest');
//.............
// const {userFormErrorHandler,createUserErrorHandler} = require('../../errorHandler/index');

const {patientTableFormat,patientFormFormat,patientTableNavTabs,
    patientViewFormat,patientUpdateFormat,patientViewSideNav} = require('../../config/patients');
const {diagnosisFormFormat,diagnosisUnitView,diagnosisFormSideNav,diagnosisTableLeftNav
        ,diagnosisTableFormat} = require('../../config/diagnosis');
const {appointmentFormFormat,appointmentTableFormat,apntmntTableLeftNav
        ,apntmntPatientTableLeftNav,appointmentUnitView,
        appointmentSingleSideNav} = require('../../config/appointment');
const {usersTableFormat,userTableNavTabs,userUnitViewFormat,usersUpdateFormFormat,
    usersUpdatePasswordForm,usersFormFormat,userUnitLeftNav} = require('../../config/users');
const {updateModalSuccess,deleteModal,updateModalMatchOld} = require('../../config/common');

const modal = require('../../utilites/modal');
const toastNotify = require('../../utilites/toastNotify');
const dashboardUtitltyFunctions = require('./utility');
const renderFormError = require('../../errorHandler/renderFormError');
const appointment = require('../../../src/dataAcces/appointment');


const API_URL = 'http://localhost:5000';//remove from here, maybe use .env file.
const currentuser  = JSON.parse(sessionStorage.getItem('currentUser'));//using session storage of html5 http://diveintohtml5.info/storage.html
const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));//change to something more secure.

const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization:`Bearer ${loginToken}`
    },
});
const userNameHeader = document.querySelector('.username');
const userBtn = document.querySelector('#users');
const patientBtn = document.querySelector('#patients');
const apntmntBtn = document.querySelector('#appointments');
const logoutBtn = document.querySelector('#logout');
 
const PAGEINDEX = 1;
const PAGESIZE = 10;

userNameHeader.innerHTML = currentuser.username;

//users nav tab
userBtn.addEventListener('click',function(event){
    usersTableView();
});

const usersTableView = async ()=>{
    //remove from here and ad to request. 
    const response = await axiosAuth.get(`/users/listAll`);
    const {data} = response;
    const userMetaData = {
        unitView:{
            unitRenderer:userSingleView,
            axiosAuth,
            url:'users/users?id='
        },
    };
    const centerContent = document.querySelector('.content-center');
    centerContent.innerHTML = '';
    
    renderActions('User');
    const usersTableData = usersTableFormat(data);
    renderTable(usersTableData,userMetaData);
    tabs('Staff Manager',userTableNavTabs);

    const addUserBtn = document.querySelector('#createModel');

    addUserBtn.addEventListener('click',function(event){
        createUser();
    });
}

const userSingleView = (userData)=>{
    
    const formatedUser = userUnitViewFormat(userData);

    renderUnitView('User',formatedUser);
    tabs('Staff',userUnitLeftNav);

    const edit = document.querySelector('#edit');
    const remove = document.querySelector('#delete');
    const editPassBtn = document.querySelector('#changeUsrpass');
    const container = document.querySelector('.container');

    edit.addEventListener('click',function(event){
        updateUserView(userData);
    });
    
    remove.addEventListener('click',function(event){

        modal(container,deleteModal({title:'Staff member'}));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click',async function(event){
            const overlay = document.querySelector('.modal-overlay');
            overlay.parentNode.removeChild(overlay);
            const response = await axiosAuth.delete(`/users/delete/${userData.id}`);
            // make response handle diffrent errors 
            toastNotify('Staff member removed successfully.','success-warn');
            usersTableView();
                
        });
    });
    editPassBtn.addEventListener('click',function(event){
        updateUserPassword(userData);
    });
}

const createUser = ()=>{
    renderForm('User',usersFormFormat);
    clearLeftNav('Add Staff');
    
    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();

        const userData = dashboardFormInputReader(usersFormFormat);
        const exists = await getByQueryRequest({getData:userData,requestRoute:'/users/user',
            query:'username',axiosAuth});
          
        const {createUserErrorHandler} = errorHandlerService;
        if(!createUserErrorHandler(userData,exists)){
            const responseData = await createRequest({postData:userData,moduleTitle:'Staff member',
                requestRoute:'/users/add',axiosAuth});
            const {user} = responseData;
            userSingleView(user);
        }        
    });

    cancelBtn.addEventListener('click',async function(event){
        event.preventDefault();
        usersTableView();
    });
}

const updateUserView = userData=>{

    renderUpdateForm('Staff',usersUpdateFormFormat,userData);
    clearLeftNav('Update Staff');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();

        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const userUpdatedData = dashboardFormInputReader(usersUpdateFormFormat);        
        const {updateUserDataErrorHandle} = errorHandlerService;

        if(updateEqualityCheck(userUpdatedData,userData)){
            modal(container,updateModalMatchOld);
        }
        else if(!updateUserDataErrorHandle(userUpdatedData)){ 
                
            const  responseData = await updateRequest({patchData:userUpdatedData,
                moudleTitle:'Staff member',
                requestRoute:`users/edit/${userData.id}`,axiosAuth});

            userSingleView(responseData);
        }     
    });
    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        userSingleView(userData);
    });
    
}

const updateUserPassword = userData=>{
    renderUpdateForm('User Password',usersUpdatePasswordForm,userData);
    clearLeftNav('Update Password');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();
        const userUpdatePassData = dashboardFormInputReader(usersUpdatePasswordForm);
        const {updateUserPasswordErrorHandle} = errorHandlerService;

        if(!updateUserPasswordErrorHandle(userUpdatePassData)){
            
            const responseData = await updateRequest({patchData:userUpdatePassData,
                moudleTitle:'Update Password',
                requestRoute:`users/editPassword/${userData.id}`,axiosAuth});
                
            if('error' in responseData){
                renderFormError({inputTitle:'oldPassword',message:'Incorrect old password',
                    inputType:'password'});
            }
            else {
                const {user} = responseData;
                userSingleView(user);
            }           
        }
        
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        userSingleView(userData);
    });

};

//patient menu item
patientBtn.addEventListener('click',function(event){
    patientTableView();
});

//patient table view
const patientTableView = async()=>{
    const response = await axiosAuth.get(`/patients/listAll`);
    const {data} = response;
    const patientMetaData = {
        unitView:{
            unitRenderer:patientSingleView,
            axiosAuth,
            url:'patients/patient?id='
        },
    };
    const centerContent = document.querySelector('.content-center');
    centerContent.innerHTML = '';
    
    renderActions('patient');
    const patientTableData =  patientTableFormat(data);
    renderTable(patientTableData,patientMetaData);
    tabs('Patients Manager',patientTableNavTabs);

    const addPatientBtn = document.querySelector('#createModel');

    addPatientBtn.addEventListener('click',function(event){
        createPatientView();
    });
}

const patientSingleView = (patientData)=>{

    const formatedPatient = patientViewFormat(patientData);
    renderUnitView('Patient',formatedPatient);
    //changing medical id something else
    tabs('patient',patientViewSideNav({medicalId:123}));

    const editBtn = document.querySelector('#edit');
    const newDiagnosisBtn = document.querySelector('#createDiagnosis');
    const newAppointmentBtn = document.querySelector('#createAppointment');
    const diagnosticLogBtn = document.querySelector('#diagnosticLog');
    const appointmentLog = document.querySelector('#appointmentLog');

    editBtn.addEventListener('click',function(event){
        udpatePatientForm(patientData);
    });

    newDiagnosisBtn.addEventListener('click',function(event){
        createDiagnosisView(patientData);
    });

    newAppointmentBtn.addEventListener('click',function(event){
        createAppointmentView(patientData);
    });

    diagnosticLogBtn.addEventListener('click',async function(event){

        const diagnosisList = await getByQueryRequest({
            getData:{patientId:patientData.id},
            requestRoute:'patients/diangosis',
            query:'patientId',
            axiosAuth
        });
        diagnosisTableView({patientData,diagnosisList});
    });

    appointmentLog.addEventListener('click',async function(event){
        const response = await getByQueryRequest({
            getData:{patientId:patientData.id},
            requestRoute:'/appointment/patient',
            query:'patientId',
            axiosAuth
        });
        // console.log(response);
        appointmentListByPatient({patientData,appointmentList:response})
    });
}



const createPatientView = ()=>{

    renderForm('Patient',patientFormFormat);
    clearLeftNav('Add Patient');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();

        const patientData = dashboardFormInputReader(patientFormFormat);
          
        const {createPatientErrorHandler} = errorHandlerService;

        if(!createPatientErrorHandler(patientData)){
            const responseData = await createRequest({postData:patientData,moduleTitle:'Patient member',
                requestRoute:'/patients/addpatient',axiosAuth});
            const {createdPatient} = responseData;
            patientSingleView(createdPatient);
        }    
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        patientTableView();
    });

}

const udpatePatientForm  = patientData=>{
    
    renderUpdateForm('Patient',patientUpdateFormat,patientData);
    clearLeftNav('Updating patient information');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');
   
    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();
        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const patientInputData = dashboardFormInputReader(patientUpdateFormat);

        const {updatePatientErrorHandler} = errorHandlerService;

        if(updateEqualityCheck(patientInputData,patientData)){
            modal(container,updateModalMatchOld);
        }
        else if(!updatePatientErrorHandler(patientInputData)){

            const  responseData = await updateRequest({patchData:patientInputData,
                moudleTitle:'Patient',
                requestRoute:`/patients/edit/${patientData.id}`,axiosAuth});

            patientSingleView(responseData);
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        patientSingleView(patientData);
    });

};
const createDiagnosisView = (patientData)=>{
    
    renderForm('Diagnosis',diagnosisFormFormat);
    clearLeftNav('Creating New Diagnosis');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');
    
    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();

        const diagnosisData = dashboardFormInputReader(diagnosisFormFormat);
        const {createDiagnosisErrorHandler} = errorHandlerService;
        
        diagnosisData.patientId = patientData.id;

        
        if(!createDiagnosisErrorHandler(diagnosisData)){
            
            const responseData = await createRequest({
            postData:diagnosisData,
            moduleTitle:'Diagnosis',
            requestRoute:'/patients/diagnosis/addDiagnosis/',
            axiosAuth});

            diagnosisSingleView(responseData);
            
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        patientSingleView(patientData);
    });

}
const diagnosisSingleView = (diagnosisData)=>{
    const diagnosisPretty = diagnosisUnitView(diagnosisData);
    renderUnitView('Diagnosis Information',diagnosisPretty);
    tabs('Diagnosis Manager',diagnosisFormSideNav());

    const updateDiagnosis = document.querySelector('#edit');
    const backToDiagLog = document.querySelector('#back');
    const deleteDiagnosis = document.querySelector('#delete');
    const container = document.querySelector('.container');

    backToDiagLog.addEventListener('click',async function(event){  
    //decrease server and db calls ? if needed
        const diagnosisList = await getByQueryRequest({
            getData:{patientId:diagnosisData.patientId},
            requestRoute:'patients/diangosis',
            query:'patientId',
            axiosAuth
        });

        const patientData = await getByQueryRequest({
            getData:{id:diagnosisData.patientId},
            requestRoute:'/patients',
            query:'id',
            axiosAuth
        });

        diagnosisTableView({patientData,diagnosisList});
    });

    updateDiagnosis.addEventListener('click',function(event){
        updateDiagnosisView(diagnosisData)
    });


    deleteDiagnosis.addEventListener('click',function(event){

        modal(container,deleteModal({title:'Diagnosis'}));
        const confirmDelete = document.querySelector('#confirm');
        
        confirmDelete.addEventListener('click',async function(event){
            const overlay = document.querySelector('.modal-overlay');
            overlay.parentNode.removeChild(overlay);
            const response = await axiosAuth.delete(`/patients/diagnosis/delete/${diagnosisData.id}`);
            // make response handle diffrent errors 
            toastNotify('Staff member removed successfully.','success-warn');

            //decrease server and db calls ? if needed
            const diagnosisList = await getByQueryRequest({
                getData:{patientId:diagnosisData.patientId},
                requestRoute:'patients/diangosis',
                query:'patientId',
                axiosAuth
            });

            const patientData = await getByQueryRequest({
                getData:{id:diagnosisData.patientId},
                requestRoute:'/patients',
                query:'id',
                axiosAuth
            });

            diagnosisTableView({patientData,diagnosisList});
        });
    });

}

const updateDiagnosisView = (diagnosisData)=>{
    
    renderUpdateForm('Diagnosis',diagnosisFormFormat,diagnosisData);
    clearLeftNav('Updating Diagnosis');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');
    const {patientId} = diagnosisData;

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();

        const updatedDiagnosisData = dashboardFormInputReader(diagnosisFormFormat);

        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const {updateDiagnosisErrorHandler} = errorHandlerService;

        
        if(!updateDiagnosisErrorHandler(updatedDiagnosisData))
        {
     
            if(updateEqualityCheck(updatedDiagnosisData,diagnosisData)){

                modal(container,updateModalMatchOld);
            }
            else {
                modal(container,updateModalSuccess);
                const applyChanges =document.querySelector('#apply');

                applyChanges.addEventListener('click',async function(event){
                    const overlay = document.querySelector('.modal-overlay');
                    overlay.parentNode.removeChild(overlay);

                    const responseData = await updateRequest({patchData:{
                        patientId:diagnosisData.patientId
                        ,...updatedDiagnosisData},
                        moudleTitle:'Diagnosis',
                        requestRoute:`/patients/updateDiagnosis/${diagnosisData.id}`,axiosAuth});

                    diagnosisSingleView(responseData);
                });
           }
           
        }
         
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        diagnosisSingleView(diagnosisData);
    });

};

const diagnosisTableView = ({patientData,diagnosisList})=>{
    const diagnosisTableData = diagnosisTableFormat(diagnosisList);
    const centerContent = document.querySelector('.content-center');
    
    centerContent.innerHTML='';
    renderActions('Visits');

    diagnosisMetaData ={
        unitView:{
            unitRenderer:diagnosisSingleView,
            axiosAuth,
            url:'/patients/getDiagnosis/query?id='
        }
    };
    renderTable(diagnosisTableData,diagnosisMetaData);
    tabs('Diagnostic Log Manager',diagnosisTableLeftNav());

    const backToPatientBtn = document.querySelector('#back');
    backToPatientBtn.addEventListener('click',function(event){
        patientSingleView(patientData);
    });
}

//create appointment view
const createAppointmentView = (singlePatient)=>{
    renderForm('Appointment',appointmentFormFormat);
    clearLeftNav('Creating New Appointment');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    if (singlePatient)
        document.querySelector('input[name="patientName"]').value = singlePatient.name;

    saveBtn.addEventListener('click',async function(event){
        event.preventDefault();

        const appointment = dashboardFormInputReader(appointmentFormFormat);
        
        const {createAppointmentErrorHandler} = errorHandlerService;
        
        if(!createAppointmentErrorHandler(appointment))
        {
            const dateTime = new Date(appointment.date);
            const hours = appointment.time.split(':');

            dateTime.setHours(parseInt(hours[0]),parseInt(hours[1]),0);
            appointment.date = dateTime.getTime();
            appointment.patientId = singlePatient.id;
            const {time,...appointmentData} = appointment;

            const responseData = await createRequest({
                postData:appointmentData,
                moduleTitle:'Appointment',
                requestRoute:'/appointment/addAppointment',
                axiosAuth});
    
                appointmentSingleView(responseData);
                
            
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        patientSingleView(singlePatient);
    });

}

//Appointment menu Item
apntmntBtn.addEventListener('click',function(event){

    const startDate = new Date();
    ipcRenderer.send('getApntmntsThisWeek',{startDate});
});

//Appointments single view
const appointmentSingleView=(appointmentData) =>{
    
    const appointmentFormFormat = appointmentUnitView(appointmentData);
    renderUnitView('Appointment Information',appointmentFormFormat);
    tabs('Appointment Manager',appointmentSingleSideNav());

    
    const backToAppLog = document.querySelector('#back');
    const updateAppointment = document.querySelector('#edit');
    const deleteAppointment = document.querySelector('#delete');
    const container = document.querySelector('.container');

    const singlePatient = {id:appointmentData.patientId};

    backToAppLog.addEventListener('click',async function(event){
        //decrease calls to server in the future
        const appointmentList = await getByQueryRequest({
            getData:{patientId:singlePatient.id},
            requestRoute:'/appointment/patient',
            query:'patientId',
            axiosAuth
        });

        //decrease calls to server in the future
        const patientData = await getByQueryRequest({
            getData:{id:singlePatient.id},
            requestRoute:'/patients',
            query:'id',
            axiosAuth
        });
        
        appointmentListByPatient({patientData,appointmentList});
    });

    updateAppointment.addEventListener('click',function(event){
        updateAppointmentView(appointmentData);
    });

    deleteAppointment.addEventListener('click',function(event){
        
        const entityData = {title:'Appointment'}
        modal(container,deleteModal(entityData));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click',async function(event){

            const overlay = document.querySelector('.modal-overlay');
            overlay.parentNode.removeChild(overlay);
            const response = await axiosAuth.delete(`/appointment/delete/${appointmentData.id}`);
            // make response handle diffrent errors 
            toastNotify('Appointment removed successfully.','success-warn');

            //decrease calls to server in the future
            const appointmentList = await getByQueryRequest({
                getData:{patientId:singlePatient.id},
                requestRoute:'/appointment/patient',
                query:'patientId',
                axiosAuth
            });

            //decrease calls to server in the future
            const patientData = await getByQueryRequest({
                getData:{id:singlePatient.id},
                requestRoute:'/patients',
                query:'id',
                axiosAuth
            });
            appointmentListByPatient({patientData,appointmentList});
        });

    });

}

ipcRenderer.on('appointmentSingleView',function(event,appointmetData){
    // const appointmentFormFormat = appointmentUnitView(appointmetData);
   
    // renderUnitView('Appointment Information',appointmentFormFormat);
    // tabs('Appointment Manager',appointmentSingleSideNav());

    // const updateAppointment = document.querySelector('#edit');
    // const backToAppLog = document.querySelector('#back');
    // const deleteAppointment = document.querySelector('#delete');
    // const container = document.querySelector('.container');

    // const singlePatient = {id:appointmetData.patientId};
   
    // updateAppointment.addEventListener('click',function(event){
    //    updateAppointmentView(appointmetData)
    // });

    deleteAppointment.addEventListener('click',function(event){
        const entityData = {title:'Appointment'}
        modal(container,deleteModal(entityData));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click',function(event){
            const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);
                ipcRenderer.send('deleteAppointment',appointmetData);
                // ipcRenderer.send('reqPatientDiagnosisLog',singlePatient);
        });
    });

    // backToAppLog.addEventListener('click',function(event){
        
    //     ipcRenderer.send('reqPatientAppointmentLog',singlePatient);
    // });
});

//Update appointments
const updateAppointmentView = (appointmentData)=>{
    renderUpdateForm('Appointment',appointmentFormFormat,appointmentData);
    clearLeftNav('Updating Appointment');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');
    const {id,patientId} = appointmentData

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();
        
        const updatedApntmntData = {
            id,
            title:document.querySelector('#title').value,
            patientName:document.querySelector('#patientName').value,
            time:document.querySelector('#time').value,
            date:new Date(`${document.querySelector('#date').value}T${
                document.querySelector('#time').value}`).getTime(),
            patientId:patientId,
        }

        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const {formInputAppointment} = errorHandler();

        if(updateEqualityCheck(updatedApntmntData,appointmentData))
        {
            modal(container,updateModalMatchOld);
        }
        else if(!formInputAppointment(updatedApntmntData)){
            updatedApntmntData.modifiedOn = Date.now();
            modal(container,updateModalSuccess);
            const applyChanges =document.querySelector('#apply');

            applyChanges.addEventListener('click',function(event){
                const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);
                ipcRenderer.send('updateAppointment',updatedApntmntData);
            });
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        appointmentSingleView(appointmentData);
    })

}

//Get Appointments By duration
ipcRenderer.on('appointmentByDuration',function(event,{appointmentList,startDate,endDate}){

    const apntmntMetaData = {
        ipcRequest:'reqAppointment',
        startDate,
        endDate,
    };
    const centerContent = document.querySelector('.content-center');
    
    centerContent.innerHTML='';
    const appointmentInputData = {
        btnId:'startDayWeek',
        date : startDate
    };

    renderApntmntTableActions(appointmentInputData);
    renderAppointmentsTable({appointmentList,apntmntMetaData});
    tabs('Appointments Log Manager',apntmntTableLeftNav());

    const openCmBtns = document.querySelectorAll('button[name="openCm"]');
    const changeStartDayWeek = document.querySelector('#startDayWeek');
    
    changeStartDayWeek.addEventListener('click',function(event){

        const inputStartDate = document.querySelector('#weekStart').value;
        
        const startDate = new Date(inputStartDate);
        ipcRenderer.send('getApntmntsThisWeek',{startDate});
    });

    openCmBtns.forEach(cmBtn => {
        cmBtn.addEventListener('click',function(event){
            const appointmentData = {
                id:cmBtn.id
            };
             ipcRenderer.send('reqAppointment',appointmentData);
        });
    });
});

const appointmentListByPatient = ({patientData,appointmentList}) => {

    //needs work
    const appointmentMetaData = {
        unitView:{
            unitRenderer:appointmentSingleView,
            axiosAuth,
            url:'/appointment/getAppointment/query?id='
        },
    };

    const appointmentTableData = appointmentTableFormat(appointmentList);
    const centerContent = document.querySelector('.content-center');
    

    centerContent.innerHTML='';

    renderActions('Appointments');
    renderTable(appointmentTableData,appointmentMetaData);
    tabs('Appointments Log Manager',apntmntPatientTableLeftNav());

    const backToPatientBtn = document.querySelector('#back');
    const activeAppointmentsBtn = document.querySelector('#acApntmt');
    const allAppointmentsBtn = document.querySelector('#allApntmt');
    const pastAppointmentsBtn = document.querySelector('#pstApntmt');

    backToPatientBtn.addEventListener('click',function(event){
        patientSingleView(patientData);
    });

    activeAppointmentsBtn.addEventListener('click',function(event){
        centerContent.innerHTML='';
        const activeAppList = appointmentList.filter(appointment => appointment.date > Date.now());
        const appointmentTableData = appointmentTableFormat(activeAppList);
        renderTable(appointmentTableData,appointmentMetaData);
    });

    allAppointmentsBtn.addEventListener('click',function(event){
        centerContent.innerHTML='';
        const appointmentTableData = appointmentTableFormat(appointmentList);
        renderTable(appointmentTableData,appointmentMetaData);
    });

    pastAppointmentsBtn.addEventListener('click',function(event){
        centerContent.innerHTML='';
        const dueAppList = appointmentList.filter(appointment => appointment.date <= Date.now());
        const appointmentTableData = appointmentTableFormat(dueAppList);
        renderTable(appointmentTableData,appointmentMetaData);
    });

};

//logout
logoutBtn.addEventListener('click',function(event){
    ipcRenderer.send('logout');
});

//toast notifications
ipcRenderer.on('updateSuccess',function(event,toastData){
    const {message,state} = toastData;
    toastNotify(message,state);
});
