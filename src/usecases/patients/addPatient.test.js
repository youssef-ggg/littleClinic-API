const {ObjectID} = require('mongodb');

const makeAddPatient = require('./addPatient');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makePatientCollection = require('../../dataAcces/patients');
const makeFakePatient = require('../../__test__/fixtures/patient');


describe('add patient',()=>{

    let patientsCollection,addPatient;
    beforeAll(()=>{
        patientsCollection = makePatientCollection({makeDb,ObjectID});
        addPatient = makeAddPatient({patientsCollection});
    });

    it('add patient successfully',async()=>{

        const fakePatient = makeFakePatient();
        const {id,...fakepatientData} = fakePatient;
        const insertedPatient = await addPatient(fakepatientData);

        expect(insertedPatient.name).toBe(fakepatientData.name);
        expect(insertedPatient.phoneNumber).toBe(fakepatientData.phoneNumber);
        expect(insertedPatient.gender).toBe(fakepatientData.gender);
        expect(insertedPatient.birthDate).toBe(fakepatientData.birthDate);
        expect(insertedPatient.balance).toBe(fakepatientData.balance);
        expect(insertedPatient.numberOfVisits).toBe(fakepatientData.numberOfVisits);
        expect(insertedPatient.active).toBe(fakepatientData.active);
        expect(insertedPatient.createdOn).toBe(fakepatientData.createdOn);
        expect(insertedPatient.modifiedOn).toBe(fakepatientData.modifiedOn);
        
    });

    it('must have a name.',async ()=>{
        const fakePatient = makeFakePatient({name:null});
        const {id,...fakepatientData} = fakePatient;

        expect(addPatient(fakepatientData)).rejects.toEqual(new Error('Patient must have a name.'));
        
    });

    it('name must be more than three characters.',async ()=>{
        const fakePatient = makeFakePatient({name:'as'});
        const {id,...fakepatientData} = fakePatient;

        expect(addPatient(fakepatientData))
            .rejects.toEqual(new Error('Patient name must be at least 3 charachters.'));
        
    });

    it('must have a gender.',async ()=>{
        const fakePatient = makeFakePatient({gender:null});
        const {id,...fakepatientData} = fakePatient;

        expect(addPatient(fakepatientData))
            .rejects.toEqual(new Error('patient must have a biological gender.'));
        
    });

    it('must have a birth date.',async ()=>{
        const fakePatient = makeFakePatient({birthDate:null});
        const {id,...fakepatientData} = fakePatient;

        expect(addPatient(fakepatientData))
            .rejects.toEqual(new Error('patient must have a birth date.'));
        
    });

    afterAll(()=>{
        clearDb('patients');
        closeDb();
    });

});