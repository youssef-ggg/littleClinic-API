const { ipcRenderer } = require('electron');
const axios = require('axios');

const renderTable = require('../../components/table');
const renderTableBody = require('../../components/tableBody');
const { renderActions, rendertableAction, renderApntmntTableActions } = require('../../components/actions');
const renderForm = require('../../components/form');
const renderUnitView = require('../../components/unitView');
const renderUpdateForm = require('../../components/updateForm');
const renderAppointmentsTable = require('../../components/appointmentTable');
const { tabs, clearLeftNav, cards } = require('../../components/leftNav');
const cardActions = require('../../components/cardActions');
const singleNavView = require('../../components/singleViewNav');
const errorHandlerService = require('../../errorHandler');
const dashboardFormInputReader = require('../../inputHandler/dashboard/formInputHandler');
const financialTransactionTable = require('../../components/financialTransactionTable');
//CRUD Requests
const createRequest = require('../../requests/createRequest');
const updateRequest = require('../../requests/updateRequest');
const getByQueryRequest = require('../../requests/getByQueryRequest');
//.............
// const {userFormErrorHandler,createUserErrorHandler} = require('../../errorHandler/index');

const { patientTableFormat, patientFormFormat, patientTableNavTabs,
    patientViewFormat, patientUpdateFormat, patientViewSideNav } = require('../../config/patients');
const { diagnosisFormFormat, diagnosisUnitView, diagnosisFormSideNav, diagnosisTableLeftNav
    , diagnosisTableFormat } = require('../../config/diagnosis');
const { appointmentFormFormat, appointmentTableFormat, apntmntTableLeftNav
    , apntmntPatientTableLeftNav, appointmentUnitView,
    appointmentSingleSideNav, patientsAppointmentSingleSideNav } = require('../../config/appointment');
const { usersTableFormat, userTableNavTabs, userUnitViewFormat, usersUpdateFormFormat,
    usersUpdatePasswordForm, usersFormFormat, userUnitLeftNav } = require('../../config/users');
const { monthlyFinancialTransaction } = require('../../config/financialTransaction');
const { updateModalSuccess, deleteModal, updateModalMatchOld } = require('../../config/common');

const modal = require('../../utilites/modal');
const toastNotify = require('../../utilites/toastNotify');
const dashboardUtitltyFunctions = require('./utility');
const renderFormError = require('../../errorHandler/renderFormError');
const table = require('../../components/table');


const API_URL = 'http://localhost:5000';//remove from here, use .env file.
const currentuser = JSON.parse(sessionStorage.getItem('currentUser'));//using session storage of html5 http://diveintohtml5.info/storage.html
const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));//change to something more secure.

const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${loginToken}`
    },
});

const toggleSideBar = document.querySelector('#toggleSideBar');
const userNameHeader = document.querySelector('.username');
const userBtn = document.querySelector('#users');
const patientBtn = document.querySelector('#patients');
const apntmntBtn = document.querySelector('#appointments');
const bookKeepingBtn = document.querySelector('#bookkeeping');
const logoutBtn = document.querySelector('#logout');

// const PAGEINDEX = 1;
// const PAGESIZE = 10;

const dashboardContent = document.querySelector('.container');
const centerContent = document.querySelector('.wrapper');
// userNameHeader.innerHTML = currentuser.username;


//toggle side Menu 
toggleSideBar.addEventListener('click', function (event) {
    const body = document.getElementsByTagName('body')[0];
    event.preventDefault();
    body.classList.toggle('sidebar-expand');
});

//toggle right menu's 
const userIconBtn = document.querySelector('#usrImg');

userIconBtn.addEventListener('onclick', function (event) {
    event.preventDefault();
    if (userIconBtn.classList.contains('dropdown-expand')) {
        userIconBtn.classList.remove('dropdown-expand')
    } else {
        userIconBtn.classList.add('dropdown-expand')
    }
});
//toggle active button
const toggleActiveSideButton = (activeBtnID) => {
    const sideBarBtns = document.querySelectorAll('.sidebar-nav-link');

    sideBarBtns.forEach(sideBtn => {

        if (sideBtn.id == activeBtnID) {
            sideBtn.classList.add('active');
        }
        else {
            sideBtn.classList.remove('active');
        }
    });
}


//users nav tab
userBtn.addEventListener('click', function (event) {
    toggleActiveSideButton('users');
    usersTableView();
});

const usersTableView = async () => {
    //remove from here and ad to request. 
    const response = await axiosAuth.get(`/users/listAll`);
    const { data } = response;
    const userMetaData = {
        unitView: {
            unitRenderer: userSingleView,
            axiosAuth,
            url: 'users/users?id='
        },
        title: 'Staff Members',
        tableActions: userTableNavTabs
    };
    centerContent.innerHTML = '';

    const usersTableData = usersTableFormat(data);
    renderTable({ parentDOM: centerContent, modelList: usersTableData, modelMetaData: userMetaData });

    const addUserBtn = document.querySelector('#createModel');

    addUserBtn.addEventListener('click', function (event) {
        createUser();
    });
}

const userSingleView = (userData) => {

    const formatedUser = userUnitViewFormat(userData);
    const { tabs } = singleNavView;
    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUnitView({ parentDOM: cardRow, modelName: 'Staff Member', model: formatedUser });
    tabs({ patentDOM: cardRow, navItems: userUnitLeftNav });

    const edit = document.querySelector('#edit');
    const remove = document.querySelector('#delete');
    const editPassBtn = document.querySelector('#changeUsrpass');

    edit.addEventListener('click', function (event) {
        updateUserView(userData);
    });

    remove.addEventListener('click', function (event) {


        modal(dashboardContent, deleteModal({ title: 'Staff member' }));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click', async function (event) {
            const overlay = document.querySelector('.modal-overlay');
            overlay.parentNode.removeChild(overlay);
            const response = await axiosAuth.delete(`/users/delete/${userData.id}`);
            // make response handle diffrent errors 
            toastNotify('Staff member removed successfully.', 'success-warn');
            usersTableView();

        });
    });
    editPassBtn.addEventListener('click', function (event) {
        updateUserPassword(userData);
    });
}

const createUser = () => {

    centerContent.innerHTML = '';
    renderForm({ parentDOM: centerContent, eleName: 'User', elementKeys: usersFormFormat });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const userData = dashboardFormInputReader(usersFormFormat);
        const exists = await getByQueryRequest({
            getData: userData, requestRoute: '/users/user',
            query: 'username', axiosAuth
        });

        const { createUserErrorHandler } = errorHandlerService;
        if (!createUserErrorHandler(userData, exists)) {
            const responseData = await createRequest({
                postData: userData, moduleTitle: 'Staff member',
                requestRoute: '/users/add', axiosAuth
            });
            const { user } = responseData;
            userSingleView(user);
        }
    });

    cancelBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        usersTableView();
    });
}

const updateUserView = userData => {

    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUpdateForm({
        parentDOM: cardRow,
        eleName: 'Staff',
        elementsMetaData: usersUpdateFormFormat,
        elementsValues: userData
    });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const { updateEqualityCheck } = dashboardUtitltyFunctions();

        const userUpdatedData = dashboardFormInputReader(usersUpdateFormFormat);
        const { updateUserDataErrorHandle } = errorHandlerService;

        if (updateEqualityCheck(userUpdatedData, userData)) {
            modal(centerContent, updateModalMatchOld);
        }
        else if (!updateUserDataErrorHandle(userUpdatedData)) {
            modal(dashboardContent, updateModalSuccess);
            const confirmUpdate = document.querySelector('#apply');

            confirmUpdate.addEventListener('click', async function (event) {
                const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);
                const responseData = await updateRequest({
                    patchData: userUpdatedData,
                    moudleTitle: 'Staff member',
                    requestRoute: `users/edit/${userData.id}`, axiosAuth
                });

                userSingleView(responseData);

            });
        }
    });
    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        userSingleView(userData);
    });

}

const updateUserPassword = userData => {

    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUpdateForm({
        parentDOM: cardRow,
        eleName: 'User Password',
        elementsMetaData: usersUpdatePasswordForm,
        elementsValues: userData
    });


    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        const userUpdatePassData = dashboardFormInputReader(usersUpdatePasswordForm);
        const { updateUserPasswordErrorHandle } = errorHandlerService;

        if (!updateUserPasswordErrorHandle(userUpdatePassData)) {

            const responseData = await updateRequest({
                patchData: userUpdatePassData,
                moudleTitle: 'Update Password',
                requestRoute: `users/editPassword/${userData.id}`, axiosAuth
            });

            if ('error' in responseData) {
                renderFormError({
                    inputTitle: 'oldPassword', message: 'Incorrect old password',
                    inputType: 'password'
                });
            }
            else {
                const { user } = responseData;
                userSingleView(user);
            }
        }

    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        userSingleView(userData);
    });

};

//patient menu item
patientBtn.addEventListener('click', function (event) {
    toggleActiveSideButton('patients');
    patientTableView();
});

//patient table view
const patientTableView = async () => {
    const response = await axiosAuth.get(`/patients/listAll`);
    const { data } = response;
    const patientMetaData = {
        unitView: {
            unitRenderer: patientSingleView,
            axiosAuth,
            url: 'patients/patient?id='
        },
        title: 'Patients',
        tableActions: patientTableNavTabs
    };
    centerContent.innerHTML = '';

    const patientTableData = patientTableFormat(data);
    renderTable({ parentDOM: centerContent, modelList: patientTableData, modelMetaData: patientMetaData });

    const addPatientBtn = document.querySelector('#createModel');

    addPatientBtn.addEventListener('click', function (event) {
        createPatientView();
    });
}

const patientSingleView = (patientData) => {

    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    const formatedPatient = patientViewFormat(patientData);
    const { tabs } = singleNavView;

    renderUnitView({ parentDOM: cardRow, modelName: 'Patient', model: formatedPatient });
    tabs({ patentDOM: cardRow, navItems: patientViewSideNav });
    //changing medical id something else
    // tabs('patient',patientViewSideNav({medicalId:123}));

    const editBtn = document.querySelector('#edit');
    const newDiagnosisBtn = document.querySelector('#createDiagnosis');
    const newAppointmentBtn = document.querySelector('#createAppointment');
    const diagnosticLogBtn = document.querySelector('#diagnosticLog');
    const appointmentLog = document.querySelector('#appointmentLog');

    editBtn.addEventListener('click', function (event) {
        udpatePatientForm(patientData);
    });

    newDiagnosisBtn.addEventListener('click', function (event) {
        createDiagnosisView(patientData);
    });

    newAppointmentBtn.addEventListener('click', function (event) {
        createAppointmentView(patientData);
    });

    diagnosticLogBtn.addEventListener('click', async function (event) {

        const diagnosisList = await getByQueryRequest({
            getData: { patientId: patientData.id },
            requestRoute: 'patients/diangosis',
            query: 'patientId',
            axiosAuth
        });
        diagnosisTableView({ patientData, diagnosisList });
    });

    appointmentLog.addEventListener('click', async function (event) {
        const response = await getByQueryRequest({
            getData: { patientId: patientData.id },
            requestRoute: '/appointment/patient',
            query: 'patientId',
            axiosAuth
        });

        appointmentListByPatient({ patientData, appointmentList: response })
    });
}

const createPatientView = () => {

    centerContent.innerHTML = '';
    renderForm({ parentDOM: centerContent, eleName: 'Patient', elementKeys: patientFormFormat });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const patientData = dashboardFormInputReader(patientFormFormat);
        const { createPatientErrorHandler } = errorHandlerService;

        if (!createPatientErrorHandler(patientData)) {
            const responseData = await createRequest({
                postData: patientData, moduleTitle: 'Patient member',
                requestRoute: '/patients/addpatient', axiosAuth
            });
            const { createdPatient } = responseData;
            patientSingleView(createdPatient);
        }
    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        patientTableView();
    });
}

const udpatePatientForm = patientData => {

    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUpdateForm({
        parentDOM: cardRow, eleName: 'Patient',
        elementsMetaData: patientUpdateFormat, elementsValues: patientData
    });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        const { updateEqualityCheck } = dashboardUtitltyFunctions();
        const container = document.querySelector('.container');
        const patientInputData = dashboardFormInputReader(patientUpdateFormat);

        const { updatePatientErrorHandler } = errorHandlerService;

        if (updateEqualityCheck(patientInputData, patientData)) {
            modal(container, updateModalMatchOld);
        }
        else if (!updatePatientErrorHandler(patientInputData)) {

            modal(dashboardContent, updateModalSuccess);
            const confirmUpdate = document.querySelector('#apply');

            confirmUpdate.addEventListener('click', async function (event) {
                const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);

                const responseData = await updateRequest({
                    patchData: patientInputData,
                    moudleTitle: 'Patient',
                    requestRoute: `/patients/edit/${patientData.id}`, axiosAuth
                });

                patientSingleView(responseData);

            });
        }
    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        patientSingleView(patientData);
    });

};
const createDiagnosisView = (patientData) => {

    centerContent.innerHTML = '';
    renderForm({ parentDOM: centerContent, eleName: 'Diagnosis', elementKeys: diagnosisFormFormat });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const diagnosisData = dashboardFormInputReader(diagnosisFormFormat);
        const { createDiagnosisErrorHandler } = errorHandlerService;

        diagnosisData.patientId = patientData.id;

        if (!createDiagnosisErrorHandler(diagnosisData)) {

            const responseData = await createRequest({
                postData: diagnosisData,
                moduleTitle: 'Diagnosis',
                requestRoute: '/patients/diagnosis/addDiagnosis/',
                axiosAuth
            });

            diagnosisSingleView(responseData);
        }
    });
    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        patientSingleView(patientData);
    });
}

const diagnosisSingleView = (diagnosisData) => {
    const diagnosisPretty = diagnosisUnitView(diagnosisData);
    const cardRow = document.createElement('div');
    const { tabs } = singleNavView;

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUnitView({ parentDOM: cardRow, modelName: 'Diagnosis Information', model: diagnosisPretty });
    tabs({ patentDOM: cardRow, navItems: diagnosisFormSideNav });

    const updateDiagnosis = document.querySelector('#edit');
    const backToDiagLog = document.querySelector('#back');
    const deleteDiagnosis = document.querySelector('#delete');
    const container = document.querySelector('.container');

    backToDiagLog.addEventListener('click', async function (event) {
        //decrease server and db calls ? if needed
        const diagnosisList = await getByQueryRequest({
            getData: { patientId: diagnosisData.patientId },
            requestRoute: 'patients/diangosis',
            query: 'patientId',
            axiosAuth
        });

        const patientData = await getByQueryRequest({
            getData: { id: diagnosisData.patientId },
            requestRoute: '/patients',
            query: 'id',
            axiosAuth
        });

        diagnosisTableView({ patientData, diagnosisList });
    });

    updateDiagnosis.addEventListener('click', function (event) {
        updateDiagnosisView(diagnosisData)
    });


    deleteDiagnosis.addEventListener('click', function (event) {

        modal(container, deleteModal({ title: 'Diagnosis' }));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click', async function (event) {
            const overlay = document.querySelector('.modal-overlay');
            overlay.parentNode.removeChild(overlay);
            const response = await axiosAuth.delete(`/patients/diagnosis/delete/${diagnosisData.id}`);
            // make response handle diffrent errors 
            toastNotify('Staff member removed successfully.', 'success-warn');

            //decrease server and db calls ? if needed
            const diagnosisList = await getByQueryRequest({
                getData: { patientId: diagnosisData.patientId },
                requestRoute: 'patients/diangosis',
                query: 'patientId',
                axiosAuth
            });

            const patientData = await getByQueryRequest({
                getData: { id: diagnosisData.patientId },
                requestRoute: '/patients',
                query: 'id',
                axiosAuth
            });

            diagnosisTableView({ patientData, diagnosisList });
        });
    });

}

const updateDiagnosisView = (diagnosisData) => {

    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUpdateForm({
        parentDOM: cardRow, eleName: 'Diagnosis',
        elementsMetaData: diagnosisFormFormat, elementsValues: diagnosisData
    });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    saveBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const updatedDiagnosisData = dashboardFormInputReader(diagnosisFormFormat);
        const { updateEqualityCheck } = dashboardUtitltyFunctions();

        const { updateDiagnosisErrorHandler } = errorHandlerService;

        if (!updateDiagnosisErrorHandler(updatedDiagnosisData)) {

            if (updateEqualityCheck(updatedDiagnosisData, diagnosisData)) {

                modal(centerContent, updateModalMatchOld);
            }
            else {
                modal(centerContent, updateModalSuccess);
                const applyChanges = document.querySelector('#apply');

                applyChanges.addEventListener('click', async function (event) {
                    const overlay = document.querySelector('.modal-overlay');
                    overlay.parentNode.removeChild(overlay);

                    const responseData = await updateRequest({
                        patchData: {
                            patientId: diagnosisData.patientId
                            , ...updatedDiagnosisData
                        },
                        moudleTitle: 'Diagnosis',
                        requestRoute: `/patients/updateDiagnosis/${diagnosisData.id}`, axiosAuth
                    });

                    diagnosisSingleView(responseData);
                });
            }
        }
    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        diagnosisSingleView(diagnosisData);
    });

};

const diagnosisTableView = ({ patientData, diagnosisList }) => {
    const diagnosisTableData = diagnosisTableFormat(diagnosisList);

    centerContent.innerHTML = '';
    // renderActions('Visits');

    diagnosisMetaData = {
        unitView: {
            unitRenderer: diagnosisSingleView,
            axiosAuth,
            url: '/patients/getDiagnosis/query?id='
        },
        tableActions: diagnosisTableLeftNav,
        title: 'Diagnostic Log'
    };

    renderTable({
        parentDOM: centerContent, modelList: diagnosisTableData, modelMetaData: diagnosisMetaData
    });

    const backToPatientBtn = document.querySelector('#back');
    backToPatientBtn.addEventListener('click', function (event) {
        patientSingleView(patientData);
    });
}

apntmntBtn.addEventListener('click', async function (event) {
    toggleActiveSideButton('appointments');
    const startDate = new Date();
    startDate.setHours(0, 0, 0);
    const weekDuration = 6;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + weekDuration);
    endDate.setHours(23, 59, 59);

    const response =
        await axiosAuth.get(`/appointment/appointmentsDuration/query?startDate=${startDate.getTime()
            }&endDate=${endDate.getTime()
            }`);

    appointmentScheduleView({ startDate, endDate, appointmentList: response.data });

});

//create appointment view
const createAppointmentView = (singlePatient) => {

    centerContent.innerHTML = '';
    renderForm({ parentDOM: centerContent, eleName: 'Appointment', elementKeys: appointmentFormFormat });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');

    if (singlePatient) {
        document.querySelector('input[name="patientName"]').value = singlePatient.name;
    }

    saveBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        const appointment = dashboardFormInputReader(appointmentFormFormat);

        const { createAppointmentErrorHandler } = errorHandlerService;

        if (!createAppointmentErrorHandler(appointment)) {
            const dateTime = new Date(appointment.date);
            const hours = appointment.time.split(':');

            dateTime.setHours(parseInt(hours[0]), parseInt(hours[1]), 0);
            appointment.date = dateTime.getTime();
            appointment.patientId = singlePatient.id;
            const { time, ...appointmentData } = appointment;

            const responseData = await createRequest({
                postData: appointmentData,
                moduleTitle: 'Appointment',
                requestRoute: '/appointment/addAppointment',
                axiosAuth
            });

            appointmentSingleView(responseData);
        }
    });
    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        patientSingleView(singlePatient);
    });
}

//Appointments single view
const appointmentSingleView = (appointmentData) => {

    const appointmentFormFormat = appointmentUnitView(appointmentData);
    const { tabs } = singleNavView;
    const cardRow = document.createElement('div');

    cardRow.classList += 'row';
    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);

    renderUnitView({ parentDOM: cardRow, modelName: 'Appointment Information', model: appointmentFormFormat });


    if (appointmentData.patientId) {
        tabs({ patentDOM: cardRow, navItems: patientsAppointmentSingleSideNav });
        const backToAppLog = document.querySelector('#back');

        backToAppLog.addEventListener('click', async function (event) {
            //decrease calls to server in the future
            const appointmentList = await getByQueryRequest({
                getData: { patientId: singlePatient.id },
                requestRoute: '/appointment/patient',
                query: 'patientId',
                axiosAuth
            });

            //decrease calls to server in the future
            const patientData = await getByQueryRequest({
                getData: { id: singlePatient.id },
                requestRoute: '/patients',
                query: 'id',
                axiosAuth
            });

            appointmentListByPatient({ patientData, appointmentList });
        });
    }
    else {
        tabs({ patentDOM: cardRow, navItems: appointmentSingleSideNav });
    }

    const updateAppointment = document.querySelector('#edit');
    const deleteAppointment = document.querySelector('#delete');
    const backToAppointments = document.querySelector('#backToSchedule');
    const container = document.querySelector('.container');

    const singlePatient = { id: appointmentData.patientId };

    backToAppointments.addEventListener('click', async function (event) {
        const startDate = new Date();
        startDate.setHours(0, 0, 0);
        const weekDuration = 6;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + weekDuration);
        endDate.setHours(23, 59, 59);

        const response =
            await axiosAuth.get(`/appointment/appointmentsDuration/query?startDate=${startDate.getTime()
                }&endDate=${endDate.getTime()
                }`);

        appointmentScheduleView({ startDate, endDate, appointmentList: response.data });
    });

    updateAppointment.addEventListener('click', function (event) {
        updateAppointmentView(appointmentData);
    });

    deleteAppointment.addEventListener('click', function (event) {

        const entityData = { title: 'Appointment' }
        modal(container, deleteModal(entityData));
        const confirmDelete = document.querySelector('#confirm');

        confirmDelete.addEventListener('click', async function (event) {

            const overlay = document.querySelector('.modal-overlay');
            overlay.parentNode.removeChild(overlay);
            const response = await axiosAuth.delete(`/appointment/delete/${appointmentData.id}`);
            // make response handle diffrent errors 
            toastNotify('Appointment removed successfully.', 'success-warn');

            //decrease calls to server in the future
            const appointmentList = await getByQueryRequest({
                getData: { patientId: singlePatient.id },
                requestRoute: '/appointment/patient',
                query: 'patientId',
                axiosAuth
            });

            //decrease calls to server in the future
            const patientData = await getByQueryRequest({
                getData: { id: singlePatient.id },
                requestRoute: '/patients',
                query: 'id',
                axiosAuth
            });
            appointmentListByPatient({ patientData, appointmentList });
        });
    });
}

//Update appointments
const updateAppointmentView = (appointmentData) => {

    const cardRow = document.createElement('div');

    centerContent.innerHTML = '';
    centerContent.appendChild(cardRow);
    cardRow.classList += 'row';

    renderUpdateForm({
        parentDOM: cardRow,
        eleName: 'Appointment',
        elementsMetaData: appointmentFormFormat,
        elementsValues: appointmentData
    });

    const saveBtn = document.querySelector('#save');
    const cancelBtn = document.querySelector('#cancel');
    const { id, patientId } = appointmentData;

    const timeInput = document.querySelector('#time');
    const dateTime = new Date(appointmentData.date);
    appointmentData.time = `${dateTime.getHours() > 9 ? dateTime.getHours() : '0' + dateTime.getHours()}:${dateTime.getMinutes() > 9 ? dateTime.getMinutes() : '0' + dateTime.getMinutes()}`;
    timeInput.value = appointmentData.time;

    saveBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const container = document.querySelector('.container');
        const updatedAppointmentData = dashboardFormInputReader(appointmentFormFormat);
        const datesTime = new Date(updatedAppointmentData.date);
        const hours = updatedAppointmentData.time.split(':');

        datesTime.setHours(parseInt(hours[0]), parseInt(hours[1]), 0);
        updatedAppointmentData.date = datesTime.getTime();

        updatedAppointmentData.id = id;
        if (patientId) {
            updatedAppointmentData.patientId = patientId;
        }

        const { updateEqualityCheck } = dashboardUtitltyFunctions();
        const { updateAppointmentErrorHandler } = errorHandlerService;

        if (updateEqualityCheck(updatedAppointmentData, appointmentData)) {
            modal(container, updateModalMatchOld);
        }
        else if (!updateAppointmentErrorHandler(updatedAppointmentData)) {
            modal(container, updateModalSuccess);
            const applyChanges = document.querySelector('#apply');

            applyChanges.addEventListener('click', async function (event) {
                const overlay = document.querySelector('.modal-overlay');
                overlay.parentNode.removeChild(overlay);

                const responseData = await updateRequest({
                    patchData: {
                        patientId: updatedAppointmentData.patientId
                        , ...updatedAppointmentData
                    },
                    moudleTitle: 'Appointment',
                    requestRoute: `/appointment/updateAppointment/${updatedAppointmentData.id}`, axiosAuth
                });

                appointmentSingleView(responseData);
            });
        }
    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        appointmentSingleView(appointmentData);
    });
}

const appointmentScheduleView = async ({ startDate, endDate, appointmentList }) => {

    const apntmntMetaData = {
        startDate,
        endDate,
    };

    centerContent.innerHTML = '';
    const appointmentInputData = {
        btnId: 'startDayWeek',
        date: startDate
    };

    renderApntmntTableActions({ parentDOM: centerContent, appointmentInputData });
    renderAppointmentsTable({ parentDOM: centerContent, appointmentList, apntmntMetaData });

    const openCmBtns = document.querySelectorAll('button[name="openCm"]');
    const changeStartDayWeek = document.querySelector('#startDayWeek');
    const addAppointment = document.querySelector('#createAppointment');

    changeStartDayWeek.addEventListener('click', async function (event) {

        const inputStartDate = document.querySelector('#weekStart').value;
        const startDate = new Date(inputStartDate);
        startDate.setHours(0, 0, 0);
        const weekDuration = 6;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + weekDuration);
        endDate.setHours(23, 59, 59);

        const response =
            await axiosAuth.get(`/appointment/appointmentsDuration/query?startDate=${startDate.getTime()
                }&endDate=${endDate.getTime()
                }`);

        appointmentScheduleView({ startDate, endDate, appointmentList: response.data });

    });

    // addAppointment.addEventListener('click',function(event){
    //     //needs work
    //     createAppointmentView({});
    // });

    openCmBtns.forEach(cmBtn => {
        cmBtn.addEventListener('click', async function (event) {

            const response = await getByQueryRequest({
                getData: { id: cmBtn.id },
                requestRoute: '/appointment/getAppointment',
                query: 'id',
                axiosAuth
            });

            const x = { startDate, endDate, appointmentList }
            appointmentSingleView(response);
        });
    });
}

const appointmentListByPatient = ({ patientData, appointmentList }) => {

    //needs work
    const appointmentMetaData = {
        unitView: {
            unitRenderer: appointmentSingleView,
            axiosAuth,
            url: '/appointment/getAppointment/query?id='
        },
        title: 'Appointments Log',
        tableActions: apntmntPatientTableLeftNav
    };

    const appointmentTableData = appointmentTableFormat(appointmentList);

    centerContent.innerHTML = '';

    renderTable({
        parentDOM: centerContent, modelList: appointmentTableData, modelMetaData: appointmentMetaData
    });

    const backToPatientBtn = document.querySelector('#back');
    const activeAppointmentsBtn = document.querySelector('#acApntmt');
    const allAppointmentsBtn = document.querySelector('#allApntmt');
    const pastAppointmentsBtn = document.querySelector('#pstApntmt');

    backToPatientBtn.addEventListener('click', function (event) {
        patientSingleView(patientData);
    });

    activeAppointmentsBtn.addEventListener('click', function (event) {


        const activeAppList = appointmentList.filter(appointment => appointment.date > Date.now());
        const appointmentTableData = appointmentTableFormat(activeAppList);
        const cardContent = document.querySelector('.card-content');
        cardContent.innerHTML = '';
        renderTableBody({
            parentDOM: cardContent, modelList: appointmentTableData, modelMetaData: appointmentMetaData
        });
    });

    allAppointmentsBtn.addEventListener('click', function (event) {

        const appointmentTableData = appointmentTableFormat(appointmentList);
        const cardContent = document.querySelector('.card-content');
        cardContent.innerHTML = '';
        renderTableBody({
            parentDOM: cardContent, modelList: appointmentTableData, modelMetaData: appointmentMetaData
        });
    });

    pastAppointmentsBtn.addEventListener('click', function (event) {

        const dueAppList = appointmentList.filter(appointment => appointment.date <= Date.now());
        const appointmentTableData = appointmentTableFormat(dueAppList);
        const cardContent = document.querySelector('.card-content');
        cardContent.innerHTML = '';
        renderTableBody({
            parentDOM: cardContent, modelList: appointmentTableData, modelMetaData: appointmentMetaData
        });

    });
};

bookKeepingBtn.addEventListener('click', async function (event) {

    toggleActiveSideButton('bookkeeping');
    const nowDate = new Date();
    const month = nowDate.getMonth() + 1;
    const year = nowDate.getFullYear();

    bookKeepingMonthlyTableView({ month, year });
});

const bookKeepingMonthlyTableView = async ({ month, year }) => {

    const response = await axiosAuth
        .get(`/financialTransaction/listMonthly/query?month=${month}&year=${year}`);

    monthylFinancialData = response.data
    const { monthlyTransactions, monthlyBalance } =
        monthlyFinancialTransaction({ monthylFinancialData });

    centerContent.innerHTML = '';

    financialTransactionTable({
        parentDOM: centerContent,
        modelList: { monthlyTransactions, monthlyBalance },
        modelMetaData: {
            tableActions: [{ id: 'singleTransaction', name: 'Add Transaction', icon: 'fas fa-edit' }],
            dateData: {
                month,
                year
            },
            tableHeader: 'Cash Ledger'
        }
    });

    const changeMonthBtn = document.querySelector('#monthChoice')
    changeMonthBtn.addEventListener('click', function (event) {
        const monthInput = document.querySelector('#monthInput').value
        const monthInputArr = monthInput.split('-')
        bookKeepingMonthlyTableView({ year: parseInt(monthInputArr[0]), month: parseInt(monthInputArr[1]) })
    })
}


logoutBtn.addEventListener('click', function (event) {
    ipcRenderer.send('logout');
});

//toast notifications
ipcRenderer.on('updateSuccess', function (event, toastData) {
    const { message, state } = toastData;
    toastNotify(message, state);
});
