const {ObjectID} = require('mongodb');

const makeDiagnosisCollection = require('../../dataAcces/diagnosis');
const makePatientCollection = require('../../dataAcces/patients');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeListDiagnosisByPatientId = require('./listByPatientId');
const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis');
const makeFakePatient = require('../../__test__/fixtures/patient');


describe('get patient\'s diagnosis log',()=>{

    let diagnosisCollection,patientCollection,listDiagnosisByPatientId;
    beforeAll(()=>{
        diagnosisCollection = makeDiagnosisCollection({makeDb,ObjectID});
        patientCollection = makePatientCollection({makeDb,ObjectID});
        listDiagnosisByPatientId = makeListDiagnosisByPatientId({diagnosisCollection});

    });

    it('successful request',async ()=>{
        
        const fakePatient = makeFakePatient();
        const {id,...fakepatientData} = fakePatient;
        
        const insertedPatient = await patientCollection.insert(fakepatientData);
        const fakeDiagnosisList = [];

        for (let index=0;index<3;index++){
            const fakeDiagnosis = makeFakeDiagnosis();
            fakeDiagnosis.patientId = insertedPatient.id;
            const insertedDiagnosis = await diagnosisCollection.insert(fakeDiagnosis);
            fakeDiagnosisList.push(insertedDiagnosis);
        }
       

        const diagnosisLog = await listDiagnosisByPatientId({patientId:insertedPatient.id});

        for (let index = 0;index <3;index++){
            
            expect(fakeDiagnosisList[index]).toMatchObject(diagnosisLog[index]);
        }
    });

    afterAll(()=>{
        clearDb('patients');
        clearDb('diagnosis');
        closeDb();
    });
});