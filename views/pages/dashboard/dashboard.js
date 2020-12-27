const {ipcRenderer} = require('electron');
const axios = require('axios');

const renderTable = require('../../components/table');
const {renderActions,rendertableAction,renderApntmntTableActions} = require('../../components/actions');
const renderForm = require('../../components/form');
const renderUnitView = require('../../components/unitView');
const renderUpdateForm = require('../../components/updateForm');
const renderAppointmentsTable = require('../../components/appointmentTable');
const {tabs,clearLeftNav} = require('../../components/leftNav');
const errorHandler = require('./errorHandler');
const {userFormErrorHandler,existingUsernameForm} = require('../../errorHandler/index');

const {patientTableFormat,patientFormFormat,patientTableNavTabs,
    patientViewFormat,patientViewSideNav} = require('../../config/patients');
const {diagnosisFormFormat,diagnosisUnitView,diagnosisFormSideNav,diagnosisTableLeftNav
        ,diagnosisTableFormat} = require('../../config/diagnosis');
const {appointmentFormFormat,appointmentTableFormat,apntmntTableLeftNav
        ,apntmntPatientTableLeftNav,appointmentUnitView,
        appointmentSingleSideNav} = require('../../config/appointment');
const {usersTableFormat,userTableNavTabs,userUnitViewFormat,usersFormFormat} = require('../../config/users');
const {updateModalSuccess,deleteModal,updateModalMatchOld} = require('../../config/common');

const modal = require('../../utilites/modal');
const toastNotify = require('../../utilites/toastNotify');
const dashboardUtitltyFunctions = require('./utility');


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
    const response = await axiosAuth.get(`/users`);
    const {data} = response;
    const userMetaData = {
        unitView:{
            unitRenderer:userSingleView,
            axiosAuth
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
    // const {id} = userData;
    const formatedUser = userUnitViewFormat(userData);

    renderUnitView('User',formatedUser);

    const edit = document.querySelector('#edit');
    const remove = document.querySelector('#delete');
    
    edit.addEventListener('click',function(event){
        updateUserView(userData);
    });
    
    remove.addEventListener('click',function(event){
        console.log('delete');
    });
}

const createUser = ()=>{
    renderForm('User',usersFormFormat);
    clearLeftNav('Add Staff');
    
    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();

        const accessList = [];
        document.querySelectorAll('#accessRights-item')
            .forEach(node=>node.innerHTML!=""?accessList.push(node.innerHTML):false);

        const userData = {
            username:document.querySelector('input[name="username"]').value,
            name:document.querySelector('input[name="name"]').value,
            occupation:document.querySelector('input[name="occupation"]').value,
            password:document.querySelector('input[name="password"]').value,
            confirmPassword:document.querySelector('input[name="confirmPassword"]').value,
            accessRights:accessList
        };

        userFormErrorHandler(userData);
        
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        usersTableView();
    });
}

const updateUserView = userData=>{
    renderUpdateForm('Staff',usersFormFormat,userData);
    clearLeftNav('Update Staff');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();
        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const accessList = [];
        document.querySelectorAll('#accessRights-item')
            .forEach(node=>node.innerHTML!=""?accessList.push(node.innerHTML):false);

        const userupdatedData = {
            username:document.querySelector('input[name="username"]').value,
            name:document.querySelector('input[name="name"]').value,
            occupation:document.querySelector('input[name="occupation"]').value,
            password:document.querySelector('input[name="password"]').value,
            confirmPassword:document.querySelector('input[name="confirmPassword"]').value,
            accessRights:accessList
        };
        
    //     const {formInputPatient} = errorHandler();

    //     if (!formInputPatient(patientInputData)){    
    //         if(updateEqualityCheck(patientInputData,patientData))
    //         {
    //             modal(container,updateModalMatchOld);
    //         }
    //         else
    //         {
    //             patientInputData.modifiedOn = Date.now();
    //             patientInputData.id = patientData.id;
    //             modal(container,updateModalSuccess);
    //             const applyChanges =document.querySelector('#apply');

    //             applyChanges.addEventListener('click',function(event){
    //                 const overlay = document.querySelector('.modal-overlay');
    //                 overlay.parentNode.removeChild(overlay);
    //                 ipcRenderer.send('updatePatient',patientInputData);
    //             });
    //         }
    //     }
    });

    // cancelBtn.addEventListener('click',function(event){
    //     event.preventDefault();
    //     ipcRenderer.send('reqPatient',patientData);
    // });
    
}

//patient menu item
patientBtn.addEventListener('click',function(event){
    ipcRenderer.send('requestPatients',{pageNum:PAGEINDEX,pageSize:PAGESIZE});
});

//patient table view
ipcRenderer.on('patientList',function(event,{patientsData,paginationData}){
    
    const centerContent = document.querySelector('.content-center');
    centerContent.innerHTML='';

    const {pageNum,pageSize,numberOfPatients} = paginationData;
    let patientDataTable = [];
    if (pageSize<numberOfPatients)
    {
        // paginatedPatients = patientsData;
        rendertableAction({entityName:'Patient',pageNum,pageSize,tableCount:numberOfPatients});
        patientDataTable = patientTableFormat(patientsData);

        const leftPaginate = document.querySelector('#paginateLeft');
        const rightPaginate = document.querySelector('#paginateRight');

        leftPaginate.addEventListener('click',function(event){

            ipcRenderer.send('requestPatients',{pageNum:(pageNum-1),pageSize});
        });
    
        rightPaginate.addEventListener('click',function(event){
    
            ipcRenderer.send('requestPatients',{pageNum:(pageNum+1),pageSize});
        });
    }
    else 
        patientDataTable = patientTableFormat(patientsData);
    tabs('Patients Manager',patientTableNavTabs);
    const patientMetaData = {
        ipcRequest:'reqPatient'
    };
    renderTable(patientDataTable,patientMetaData);
   
    
    
    const createBtn = document.querySelector('#createModel');
    

    createBtn.addEventListener('click',function(event){
            
        renderForm('Patient',patientFormFormat);
        clearLeftNav('Creating New Patient');
        const saveBtn = document.querySelector('#save');
        const cancelBtn = document.querySelector('#cancel');
        
        saveBtn.addEventListener('click',function(event){
            event.preventDefault();
            
            const {formInputPatient} = errorHandler();

            const patientInputData = {
                name:document.querySelector('input[name="name"]').value,
                phoneNumber:document.querySelector('input[name="phoneNumber"]').value,
                gender:document.querySelector('input[id="Female"]').checked ? 'female':
                    document.querySelector('input[id="Male"]').checked ? 'male':null,
                birthDate:Date.parse(document.querySelector('input[name="birthDate"]').value),
            }
            if(!formInputPatient(patientInputData))
            {
                ipcRenderer.send('createPatient',patientInputData);   
            }
            

        });

        cancelBtn.addEventListener('click',function(event){
            event.preventDefault();
            ipcRenderer.send('requestPatients',{pageNum,pageSize});
        });

    });
    
});

//patient single view
ipcRenderer.on('patientFormView',function(event,patient){
    const singlePatient = patient[0]; //change this to only in data access
    const patientModel = patientViewFormat(singlePatient);
    
    renderUnitView('Patient Information',patientModel);
    tabs('Patient Manager',patientViewSideNav({medicalRecordId:'45907123'}));

    const newDiagnosisBtn = document.querySelector('#createDiagnosis');
    const newAppointmentBtn = document.querySelector('#createAppointment');
    const diagnosticLogBtn = document.querySelector('#diagnosticLog');
    const appointmentLog = document.querySelector('#apointLog');
    const updatePatientBtn = document.querySelector('#edit');

    diagnosisView(newDiagnosisBtn,singlePatient);
    
    newAppointmentBtn.addEventListener('click',function(event){
        createAppointmentView(singlePatient);
    });

    updatePatientBtn.addEventListener('click',function (event){
        udpatePatientForm(singlePatient);
    });

    diagnosticLogBtn.addEventListener('click',function(event){
        ipcRenderer.send('reqPatientDiagnosisLog',singlePatient);
    });

    appointmentLog.addEventListener('click',function(event){
        ipcRenderer.send('reqPatientAppointmentLog',singlePatient);
    })
});

//update patient info
const udpatePatientForm  = patientData=>{
    
    renderUpdateForm('Patient',patientFormFormat,patientData);
    clearLeftNav('Updating patient information');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();
        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const patientInputData = {
            name:document.querySelector('input[name="name"]').value,
            phoneNumber:document.querySelector('input[name="phoneNumber"]').value,
            gender:document.querySelector('input[id="Female"]').checked ? 'female':
                document.querySelector('input[id="Male"]').checked ? 'male':null,
            birthDate:Date.parse(document.querySelector('input[name="birthDate"]').value),
        };
        const {formInputPatient} = errorHandler();

        if (!formInputPatient(patientInputData)){    
            if(updateEqualityCheck(patientInputData,patientData))
            {
                modal(container,updateModalMatchOld);
            }
            else
            {
                patientInputData.modifiedOn = Date.now();
                patientInputData.id = patientData.id;
                modal(container,updateModalSuccess);
                const applyChanges =document.querySelector('#apply');

                applyChanges.addEventListener('click',function(event){
                    const overlay = document.querySelector('.modal-overlay');
                    overlay.parentNode.removeChild(overlay);
                    ipcRenderer.send('updatePatient',patientInputData);
                });
            }
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        ipcRenderer.send('reqPatient',patientData);
    });

};

//create diagnosis view
const diagnosisView = (newDiagnosisBtn,singlePatient) =>{

    newDiagnosisBtn.addEventListener('click',function(event){
 
        renderForm('Diagnosis',diagnosisFormFormat);
        clearLeftNav('Creating New Diagnosis');

        
        const saveBtn = document.querySelector('#save');
        const cancelBtn = document.querySelector('#cancel');

        saveBtn.addEventListener('click',function(event){
            event.preventDefault();

            const {formInputDiagnosis} = errorHandler();

            let problemList = [];
            let medicationList = [];
            let treatmentList = [];
            let ordersList = [];
            
            document.querySelectorAll('#problems-item')
                .forEach(node=>node.innerHTML!=""?problemList.push(node.innerHTML):false);
            document.querySelectorAll('#medications-item')
                .forEach(node=>node.innerHTML!=""?medicationList.push(node.innerHTML):false);
            document.querySelectorAll('#treatment-item')
                .forEach(node=>node.innerHTML!=""?treatmentList.push(node.innerHTML):false);
            document.querySelectorAll('#orders-item')
                .forEach(node=>node.innerHTML!=""?ordersList.push(node.innerHTML):false);

            const diagnosis = {
                patientId:singlePatient.id,
                cheifComplaint:document.querySelector('#cheifComplaint').value,
                problems:problemList,
                medications:medicationList,
                treatment:treatmentList,
                orders:ordersList,
            };

             if(!formInputDiagnosis(diagnosis))
             {
                ipcRenderer.send('createDiagnosis',diagnosis);   
             }
            
        });

        cancelBtn.addEventListener('click',function(event){
            event.preventDefault();
            ipcRenderer.send('reqPatient',singlePatient);
        });

    });
}

//diagnosis single view
ipcRenderer.on('diagnosisSingleView',function(event,diagnosisData){
    const diagnosisPretty = diagnosisUnitView(diagnosisData);
   
    renderUnitView('Diagnosis Information',diagnosisPretty);
    tabs('Diagnosis Manager',diagnosisFormSideNav());

    const updateDiagnosis = document.querySelector('#edit');
    const backToDiagLog = document.querySelector('#back');
    const deleteDiagnosis = document.querySelector('#delete');

    const container = document.querySelector('.container');

    const singlePatient = {id:diagnosisData.patientId};
    
    updateDiagnosis.addEventListener('click',function(event){
        updateDiagnosisView(diagnosisFormFormat,diagnosisData)
    });

    deleteDiagnosis.addEventListener('click',function(event){
        const entityData = {title:'Diagnosis'}
        modal(container,deleteModal(entityData));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click',function(event){
            const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);
                ipcRenderer.send('deleteDiagnosis',diagnosisData);
                ipcRenderer.send('reqPatientDiagnosisLog',singlePatient);
        });

    });

    backToDiagLog.addEventListener('click',function(event){
        
        ipcRenderer.send('reqPatientDiagnosisLog',singlePatient);
    });
});

//update diagnosis view
const updateDiagnosisView = (diagnosisFormFormat,diagnosisData)=>{
    
    renderUpdateForm('Diagnosis',diagnosisFormFormat,diagnosisData);
    clearLeftNav('Updating Diagnosis');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');
    const {patientId} = diagnosisData;

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();

        const {formInputDiagnosis} = errorHandler();

        let problemList = [];
        let medicationList = [];
        let treatmentList = [];
        let ordersList = [];
        
        document.querySelectorAll('#problems-item')
            .forEach(node=>node.innerHTML!=""?problemList.push(node.innerHTML):false);
        document.querySelectorAll('#medications-item')
            .forEach(node=>node.innerHTML!=""?medicationList.push(node.innerHTML):false);
        document.querySelectorAll('#treatment-item')
            .forEach(node=>node.innerHTML!=""?treatmentList.push(node.innerHTML):false);
        document.querySelectorAll('#orders-item')
            .forEach(node=>node.innerHTML!=""?ordersList.push(node.innerHTML):false);

        const diagnosis = {
            patientId:patientId,
            cheifComplaint:document.querySelector('#cheifComplaint').value,
            problems:problemList,
            medications:medicationList,
            treatment:treatmentList,
            orders:ordersList,
        };

        const  {updateEqualityCheck} = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        if(updateEqualityCheck(diagnosis,diagnosisData))
        {
            modal(container,updateModalMatchOld);
        }
        else if(!formInputDiagnosis(diagnosis))
        {
            diagnosis.modifiedOn = Date.now();
            diagnosis.id = diagnosisData.id;
            modal(container,updateModalSuccess);
            const applyChanges =document.querySelector('#apply');

            applyChanges.addEventListener('click',function(event){
                const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);
                ipcRenderer.send('UpdateDiagnosis',diagnosis);
            });
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        ipcRenderer.send('reqDiagnosis',diagnosisData);
    });

};

//diagnosis Table view
ipcRenderer.on('diagnosisList',function(event,patientData){
    const {singlePatient,diagnosisList} = patientData;
    const diagnosisMetaData = {
        ipcRequest:'reqDiagnosis'
    }
    const diagnosisTableData = diagnosisTableFormat(diagnosisList);
    const centerContent = document.querySelector('.content-center');
    
    centerContent.innerHTML='';
    renderActions('Visits');
    renderTable(diagnosisTableData,diagnosisMetaData);
    tabs('Diagnostic Log Manager',diagnosisTableLeftNav());

    const backToPatientBtn = document.querySelector('#back');
    backToPatientBtn.addEventListener('click',function(event){
        ipcRenderer.send('reqPatient',singlePatient);
    });

});

//create appointment view
const createAppointmentView = (singlePatient)=>{
    renderForm('Appointment',appointmentFormFormat);
    clearLeftNav('Creating New Appointment');

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    if (singlePatient)
        document.querySelector('input[name="patientName"]').value = singlePatient.name;

    saveBtn.addEventListener('click',function(event){
        event.preventDefault();

        
        const appointment = {
            title:document.querySelector('input[name="title"]').value,
            patientName : document.querySelector('input[name="patientName"]').value,
            time : document.querySelector('input[name="time"]').value,
            date : new Date(`${document.querySelector('input[name="date"]').value}T${
                document.querySelector('input[name="time"]').value}`).getTime(),
            patientId : singlePatient.id?singlePatient.id:null 
        }
        const {formInputAppointment} = errorHandler();
        
        if(!formInputAppointment(appointment))
        {
            ipcRenderer.send('createAppointment',appointment);
        }
    });

    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        ipcRenderer.send('reqPatient',singlePatient);
    });

}

//Appointment menu Item
apntmntBtn.addEventListener('click',function(event){

    const startDate = new Date();
    ipcRenderer.send('getApntmntsThisWeek',{startDate});
});

//Appointments single view
ipcRenderer.on('appointmentSingleView',function(event,appointmetData){
    const appointmentFormFormat = appointmentUnitView(appointmetData);
   
    renderUnitView('Appointment Information',appointmentFormFormat);
    tabs('Appointment Manager',appointmentSingleSideNav());

    const updateAppointment = document.querySelector('#edit');
    const backToAppLog = document.querySelector('#back');
    const deleteAppointment = document.querySelector('#delete');
    const container = document.querySelector('.container');

    const singlePatient = {id:appointmetData.patientId};
   
    updateAppointment.addEventListener('click',function(event){
       updateAppointmentView(appointmetData)
    });

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

    backToAppLog.addEventListener('click',function(event){
        
        ipcRenderer.send('reqPatientAppointmentLog',singlePatient);
    });
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
        ipcRenderer.send('reqAppointment',appointmentData);
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

//Get Appointments by patient
ipcRenderer.on('appointmentList',function(event,patientData){
    const {singlePatient,appointmentList} = patientData;

    const appointmentMetaData = {
        ipcRequest:'reqAppointment'
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
        ipcRenderer.send('reqPatient',singlePatient);
    });

    activeAppointmentsBtn.addEventListener('click',function(event){
        ipcRenderer.send('reqActiveAppPatientID',singlePatient);
    });
    
    allAppointmentsBtn.addEventListener('click',function(event){
        ipcRenderer.send('reqPatientAppointmentLog',singlePatient);
    });

    pastAppointmentsBtn.addEventListener('click',function(event){
        ipcRenderer.send('reqPastAppPatientID',singlePatient);
    });

});

//logout
logoutBtn.addEventListener('click',function(event){
    ipcRenderer.send('logout');
});

//toast notifications
ipcRenderer.on('updateSuccess',function(event,toastData){
    const {message,state} = toastData;
    toastNotify(message,state);
});
