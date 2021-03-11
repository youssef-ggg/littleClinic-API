const {ObjectID} = require('mongodb');

const buildGetPatient = require('./getPatient');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makePatientCollection = require('../../dataAcces/patients');
const makeFakePatient = require('../../__test__/fixtures/patient');

describe('get user by id.',()=>{

    let patientsCollection,getPatientById;
    beforeAll(()=>{
        patientsCollection = makePatientCollection({makeDb,ObjectID});
        getPatientById = buildGetPatient({patientsCollection});
    });

    it('get user successfully',async()=>{
        
        const fakePatient = makeFakePatient();
        const {id,...fakepatientData} = fakePatient;
        
        const insertedPatient = await patientsCollection.insert(fakepatientData);

        const returnedPatient = await getPatientById(insertedPatient.id);
       
        expect(returnedPatient).toMatchObject(insertedPatient);
    });


    afterAll(()=>{
        clearDb('patients');
        closeDb();
    });
});