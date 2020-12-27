
module.exports = Object.freeze({
    
    diagnosisFormFormat:[
        {
            label:'Cheif Complaint',
            id:'cheifComplaint',
            type:'textarea',
        },
        {
            label:'Problems',
            id:'problems',
            type:'textArray',
        },
        {
            label:'Add Medication',
            id:'medications',
            type:'textArray',
        },
        {
            label:'Add Treatment',
            id:'treatment',
            type:'textArray'
        },
        {
            label:'Orders',
            id:'orders',
            type:'textArray'
        },
       
    ],
    diagnosisFormSideNav:()=>{

        return [
            {
                name:'Back',
                id:'back',
                icon:'fas fa-arrow-circle-left'
            },
            {
                name:'Vital Signs',
                id:'vitalSigns',
                icon:'fas fa-heartbeat'
            },
            {
                name:'Physical Exam',
                id:'pyhsicalExam',
                icon:'fas fa-stethoscope'
            },
        ];
    },
    diagnosisUnitView:(diagnosisData)=>{

        const {cheifComplaint,problems,medications,treatment,orders,createdOn,modifiedOn} = diagnosisData;

        const dateFormatCreate = new Date(createdOn);
        const dateFormatmodified = new Date(modifiedOn);
        
        const dateOptions = {
            weekday:'long',
            month:'long',
            day:'numeric',
            year:'numeric',
        }
        
        const diagnosisModel= {
            'Cheif Complaint':cheifComplaint,
            Problems:problems,
            Medication:medications.length!=0?medications:'No prescribed medication.',
            Treatment:treatment.length !=0?treatment :'No treament offered.',
            Orders:orders!=0?orders:'No orders given.',
            'Created Date':dateFormatCreate.toLocaleDateString('en-EN',dateOptions),
            'Created Time':dateFormatCreate.toLocaleTimeString('en-EN'),
            'Modified Date':dateFormatmodified.toLocaleDateString('en-EN',dateOptions),
            'Modified Time':dateFormatmodified.toLocaleTimeString('en-EN'),
            }
            
        return diagnosisModel;
    },
    diagnosisTableFormat:(diagnosisDataList)=>{
        let diagnosisTable = [];

        diagnosisDataList.forEach(visit=>{
            const {id,cheifComplaint,problems,createdOn} = visit;
            const dateFormat = new Date(createdOn);
            const dateOptions = {
                month:'long',
                day:'numeric',
                year:'numeric',
            }

            diagnosisTable.push({
                id,
                'Cheif Complaint':cheifComplaint,
                Problems:problems,
                'Created Date':dateFormat.toLocaleDateString('en-En',dateOptions),
            });
        });

        return diagnosisTable;
    },
    diagnosisTableLeftNav:()=>{
        return [
            {
                name:'Back',
                id:'back',
                icon:'fas fa-arrow-circle-left'
            }
        ]
    },
    
});