module.exports = Object.freeze({
    appointmentFormFormat:[
        {
            label:'Title',
            id:'title',
            type:'text',
        },
        {
            label:'Patient Name',
            id:'patientName',
            type:'text',
        },
        {
            label:'Time',
            id:'time',
            type:'time',
        },
        {
            label:'Date',
            id:'date',
            type:'date',
        },
        
    ],
    appointmentTableFormat:appointmentDataList=>{
        let appointmentTable = [];
        appointmentDataList.forEach(appointment => {
            const {id,title,time,date,patientName} = appointment;
            const dateFormat = new Date(date);
            const dateOptions = {
                month:'long',
                day:'numeric',
                year:'numeric',
            }
            const due = Date.now() < dateFormat.getTime()?'Pending':'Passed';

            const timeFormat = `${dateFormat.getHours()}:${
                dateFormat.getMinutes()>9?dateFormat.getMinutes():'0'+dateFormat.getMinutes()
            }`;
            appointmentTable.push({
                id,
                'Time':timeFormat,
                'Patient Name':patientName,
                'Title':title,
                'Date':dateFormat.toLocaleDateString('en-EN',dateOptions),
                'Due':due
            });
        });
        return appointmentTable;
    },
    appointmentTableFormatByPatient:appointmentDataList=>{
        let appointmentTable = [];
        appointmentDataList.forEach(appointment => {
            const {id,title,time,date} = appointment;
            const dateFormat = new Date(date);
            const dateOptions = {
                month:'long',
                day:'numeric',
                year:'numeric',
            }
            const due = Date.now() < dateFormat.getTime()?'Pending':'Passed';

            appointmentTable.push({
                id,
                'Title':title,
                'Time':time,
                'Date':dateFormat.toLocaleDateString('en-EN',dateOptions),
                'Due':due
            });
        });
        return appointmentTable;
    },
    apntmntTableLeftNav:[
        {
            name:'Today',
            id:'today',
            icon:'fas fa-calendar-day'
        },
        {
            name:'By Week',
            id:'week',
            icon:'fas fa-calendar-week'
        },
        {
            name:'All Appointments',
            id:'allapntmnt',
            icon:'fas fa-calendar-alt'
        },
        {
            name:'New Appointment',
            id:'createAppointment',
            icon:'fas fa-pencil-ruler'
        },
    ],
    apntmntPatientTableLeftNav:[
        {
            name:'Back',
            id:'back',
            icon:'fas fa-arrow-circle-left'
        },
        {
            name:'Active Appointments',
            id:'acApntmt',
            icon:'fas fa-calendar-check'
        },
        {
            name:'All Appointments',
            id:'allApntmt',
            icon:'fas fa-calendar-alt'
        },
        {
            name:'Past Appointments',
            id:'pstApntmt',
            icon:'fas fa-calendar-times'
        }
    ],
    appointmentUnitView:appointmentData=>{
        const {title,patientName,date,createdOn,modifiedOn} = appointmentData;

        const dateFormatAppointment = new Date(date);
        const dateFormatCreate = new Date(createdOn);
        const dateFormatmodified = new Date(modifiedOn);

        const formatedTime = `${dateFormatAppointment.getHours()>9?
        dateFormatAppointment.getHours():'0'+dateFormatAppointment.getHours()}:${
            dateFormatAppointment.getMinutes()>9?
            dateFormatAppointment.getMinutes():'0'+dateFormatAppointment.getMinutes()
        }`;
        
        
        const dateOptions = {
            weekday:'long',
            month:'long',
            day:'numeric',
            year:'numeric',
        }

        const appointmentModel = {
            'Title':title,
            'Patient Name':patientName,
            'Time':formatedTime,
            'Date':dateFormatAppointment.toLocaleDateString('en-EN',dateOptions),
            'Created On':dateFormatCreate.toLocaleDateString('en-En',dateOptions),
            'Modified On':dateFormatmodified.toLocaleDateString('en-En',dateOptions)
        }

        return appointmentModel;
    },
    patientsAppointmentSingleSideNav:[
        {
            name:'Back to Appointment Table',
            id:'backToSchedule',
            icon:'fas fa-arrow-circle-left' 
        },
        {
            name:'Back To Appointment Log',
            id:'back',
            icon:'fas fa-history'
        }
    ],
    appointmentSingleSideNav:[
        {
            name:'Back to Appointment Table',
            id:'backToSchedule',
            icon:'fas fa-arrow-circle-left'
        },
    ],
})