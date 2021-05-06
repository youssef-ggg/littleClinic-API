const {ObjectID} = require('mongodb');

const makeAppointmentCollection = require('../../dataAcces/appointment');
const makePatientCollection = require('../../dataAcces/patients');
const makeListAppointmentByPatientId = require('./listByPatientId');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');

const makeFakeAppointment = require('../../__test__/fixtures/appointment');
const makeFakePatient = require('../../__test__/fixtures/patient');

describe('get patient\'s appointment log',()=>{

    let appointmentCollection,patientCollection,listAppointmentByPatientId;

    beforeAll(()=>{
        appointmentCollection = makeAppointmentCollection({makeDb,ObjectID});
        patientCollection = makePatientCollection({makeDb,ObjectID});
        listAppointmentByPatientId = makeListAppointmentByPatientId({appointmentCollection});
    });

    it('successfull request',async()=>{

        const fakePatient = makeFakePatient();
        const {id,...fakepatientData} = fakePatient;

        const insertedPatient = await patientCollection.insert(fakepatientData);
        const fakeAppointmentList = [];

        for (let index=0;index<3;index++){

            const fakeAppointment = makeFakeAppointment();
            fakeAppointment.patientId = insertedPatient.id;
            fakeAppointment.patientName = insertedPatient.name;
            const insertedAppointment = await appointmentCollection.insert(fakeAppointment);
            fakeAppointmentList.push(insertedAppointment);
        }

        
        const appointmentLog = await listAppointmentByPatientId({patientId:insertedPatient.id});
        
        //sort reversed list by date
        fakeAppointmentList.sort((el1,el2)=>{
            if(el1.date < el2.date)
                return 1;
            if(el1.date > el2.date)
                return -1;
        });

        // fakeAppointmentList.reverse();

        for (let index = 0;index <3;index++){   
            
            expect(fakeAppointmentList[index]).toMatchObject(appointmentLog[index]);
        }
    });

    afterAll(()=>{
        clearDb('patients');
        clearDb('appointments');
        closeDb();
    });
});