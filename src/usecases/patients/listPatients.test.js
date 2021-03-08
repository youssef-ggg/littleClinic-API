const {ObjectID} = require('mongodb')

const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makePatientCollection = require('../../dataAcces/patients');
const makeFakePatient = require('../../__test__/fixtures/patient');
const makeListPatients = require('./listPatients');

describe('list all patients',()=>{
    let patientsCollection,listPatients;
    beforeAll(()=>{
        patientsCollection = makePatientCollection({makeDb,ObjectID});
        listPatients = makeListPatients({patientsCollection});
    });

    it('list all patients',async ()=>{
        const patients = [];
        for (let index = 0;index <6;index++){
            const fakePatient = makeFakePatient();
            
            const {id,...fakepatientData} = fakePatient;
            patients.push(fakepatientData);
            await patientsCollection.insert(fakepatientData);
        }

        const patientListdb = await listPatients();

        for (let index = 0;index <6;index++){
            const {id,...patientDbData} = patientListdb[index];
            expect(patientDbData).toMatchObject(patients[index]);
        }
    });

    afterAll(()=>{
        clearDb('patients');
        closeDb();
    });
});