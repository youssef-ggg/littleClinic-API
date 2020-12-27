module.exports = Object.freeze({

    patientTableFormat:(patientsData)=>{
        let patientDataTable = [];
        
        patientsData.forEach(patient=>{
            
            const {id,name,phoneNumber ,gender,birthDate,balance} = patient;
    
            const ageDifMs = Date.now() - birthDate;
            const ageDate = new Date(ageDifMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);

            patientDataTable.push({
                id,
                Name:name,
                Number:phoneNumber,
                Gender:gender,
                Age:age,
                Balance:balance
            });
        });

        return patientDataTable;
    },
    patientTableNavTabs:[
        {
            name:'Add Patient',
            id:'createModel',
            icon:'fas fa-pencil-ruler'
        }
    ],
    patientFormFormat:[
        {
            label:'Name',
            id:'name',
            type:'text',
        },
        {
            label:'Phone Number',
            id:'phoneNumber',
            type:'text',
        },
        {
            label:'Gender',
            type:'radio',
            id:'gender',
            choices:['Female','Male'],
        },
        {
            label:'Birth Date',
            type:'date',
            id:'birthDate',
        },

    ],
    patientViewFormat:(patientData)=>{
         
        const {name,phoneNumber ,gender,birthDate,balance,totalExpenses,active,medicalRecordId} = patientData;
        const ageDifMs = Date.now() - birthDate;
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        const dateFormat = new Date(birthDate);

        const dateOptions = {
            month:'long',
            day:'numeric',
            year:'numeric'
        };

        const patientModel= {
            Name:name,
            'Phone Number':phoneNumber,
            Gender:gender,
            'Birth Date':dateFormat.toLocaleDateString('en-EN',dateOptions),
            Age:age,
            Balance:balance,
            'Total Expensis':totalExpenses,
            Active:active
            }
            
        return patientModel;
    },
    patientViewSideNav:(tabsIDs)=>{

        const {medicalRecordId} = tabsIDs;
        return [
            {
                name:'New Diagnosis',
                id:'createDiagnosis',
                icon:'fas fa-file-signature'
            },
            {
                name:'New Appointment',
                id:'createAppointment',
                icon:'fas fa-clock'
            },
            {
                name:'Medical Record',
                id:medicalRecordId,
                icon:'fas fa-clipboard'
            },
            {
                name:'Diagnostic Log',
                id:'diagnosticLog',
                icon:'fas fa-list'
            },
            {
                name:'Appointments Log',
                id:'apointLog',
                icon:'fas fa-history'
            },
            
        ]
    }
});

