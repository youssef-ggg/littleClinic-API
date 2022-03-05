module.exports = Object.freeze({

    patientTableFormat: (patientsData) => {
        let patientDataTable = [];

        patientsData.forEach(patient => {

            const { id, name, phoneNumber, gender, birthDate, balance } = patient;

            const ageDifMs = Date.now() - birthDate;
            const ageDate = new Date(ageDifMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);

            patientDataTable.push({
                id,
                Name: name,
                Number: phoneNumber,
                Gender: gender,
                Age: age,
                Balance: balance
            });
        });

        return patientDataTable;
    },
    patientTableNavTabs: [
        {
            name: 'Add Patient',
            id: 'createModel',
            icon: 'fas fa-pencil-ruler',
            type: 'button'
        },
        {
            name: 'Delete Selected',
            icon: 'fas fa-trash',
            type: 'button'
        },
        {
            name: 'Select All',
            icon: 'fas fa-check-square',
            type: 'button'
        }
    ],
    patientFormFormat: [
        {
            label: 'Name',
            id: 'name',
            type: 'text',
        },
        {
            label: 'Phone Number',
            id: 'phoneNumber',
            type: 'text',
        },
        {
            label: 'Gender',
            type: 'radio',
            id: 'gender',
            choices: ['Female', 'Male'],
        },
        {
            label: 'Birth Date',
            type: 'date',
            id: 'birthDate',
        },

    ],
    patientViewFormat: (patientData) => {

        const { name, phoneNumber, gender, birthDate, balance, numberOfVisits, active, medicalRecordId } = patientData;
        const ageDifMs = Date.now() - birthDate;
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        const dateFormat = new Date(birthDate);

        const dateOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };

        const patientModel = {
            Name: name,
            'Phone Number': phoneNumber,
            Gender: gender,
            'Birth Date': dateFormat.toLocaleDateString('en-EN', dateOptions),
            Age: age,
            Balance: balance,
            'Number of Vistis': numberOfVisits,
            Active: active
        }

        return patientModel;
    },
    patientUpdateFormat: [
        {
            label: 'Name',
            id: 'name',
            type: 'text',
        },
        {
            label: 'Phone Number',
            id: 'phoneNumber',
            type: 'text',
        },
        {
            label: 'Gender',
            type: 'radio',
            id: 'gender',
            choices: ['female', 'male'],
        },
        {
            label: 'Birth Date',
            type: 'date',
            id: 'birthDate',
        },
        {
            label: 'Balance',
            type: 'number',
            id: 'balance',
        },
        {
            label: 'Number Of Visits',
            type: 'text',
            id: 'numberOfVisits',
        },

    ],
    patientViewSideNav: [
        {
            name: 'New Diagnosis',
            id: 'createDiagnosis',
            icon: 'fas fa-file-signature'
        },
        {
            name: 'New Appointment',
            id: 'createAppointment',
            icon: 'fas fa-clock'
        },
        // {
        //     name:'Medical Record',
        //     id:'medicalRecordId',
        //     icon:'fas fa-clipboard'
        // },
        {
            name: 'Billing',
            id: 'billing',
            icon: "fas fa-receipt"
        },
        {
            name: 'Diagnostic Log',
            id: 'diagnosticLog',
            icon: 'fas fa-list'
        },
        {
            name: 'Appointments Log',
            id: 'appointmentLog',
            icon: 'fas fa-history'
        }
    ],
    patientBillingForm: () => {
        const date = new Date();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

        return [
            {
                label: 'Description',
                id: 'description',
                type: 'text'
            },
            {
                label: 'Amount',
                type: 'number',
                id: 'amount',
            },
            {
                label: 'Date',
                id: 'date',
                type: 'date',
                value: `${date.getFullYear()}-${month}-${day}`,
                readOnly: true
            },
            {
                label: 'Cash Flow',
                type: 'text',
                id: 'cashFlow',
                value: 'Cash In',
                readOnly: true
            },
            {
                label: 'Type',
                id: 'type',
                type: 'text',
                value: 'revenue',
                readOnly: true
            }
        ]
    }
});

