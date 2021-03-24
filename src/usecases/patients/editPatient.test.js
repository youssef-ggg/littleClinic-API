const {ObjectID} = require('mongodb');
const faker = require('faker');

const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makePatientCollection = require('../../dataAcces/patients');
const makeFakePatient = require('../../__test__/fixtures/patient');
const makeEditPatient = require('./editPatient');
const editPatient = require('./editPatient');

describe('update patient data.',()=>{

    let patientsCollection,editPatient;
    beforeAll(()=>{
        patientsCollection = makePatientCollection({makeDb,ObjectID});
        editPatient = makeEditPatient({patientsCollection});
    });

    it('updated successfully.',async ()=>{

        const fakePatient = makeFakePatient();
        
        const {id,...fakepatientData} = fakePatient;
        const insertedPatient = await patientsCollection.insert(fakepatientData);
    
        if (fakepatientData.balance != 0){
            fakepatientData.balance  = 0;
        }
        else{
            fakepatientData.balance = 100;
        }
        
        const updatedPatient = await editPatient({id:insertedPatient.id,...fakepatientData});

        expect(updatedPatient.id.toString()).toBe(insertedPatient.id.toString());
        expect(updatedPatient.balance).not.toBe(insertedPatient.balance);
        
    });

    it('must supply an id',()=>{
        
        const fakePatient = makeFakePatient();
        const {id,...fakepatientData} = fakePatient;

        expect(editPatient(fakepatientData)).rejects.toThrow('You must supply an id.');
    });

    it('invalid id',()=>{
        const fakePatient = makeFakePatient();
        expect(editPatient(fakePatient)).rejects.toThrow('Invalid id.');
    });

    it('patient doesn\'t exist',async ()=>{
        const fakePatient = makeFakePatient();
        fakePatient.id = '60578f606defb028c820befb';
        
        expect(editPatient(fakePatient)).rejects.toThrow('patient not found.');
    });

    afterAll(()=>{
        clearDb('patients');
        closeDb();
    });
});