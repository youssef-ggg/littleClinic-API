const {ObjectID} = require('mongodb');
const faker = require('faker');

const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeDiagnosisCollection = require('../../dataAcces/diagnosis');
const makeFakeDiagosis = require('../../__test__/fixtures/diagnosis');
const makeEditDiagnosis = require('./editDiagnosis');

describe('edit diagnosis',()=>{

    let diagnosisCollection,editDiagnosis;
    beforeAll(()=>{
        diagnosisCollection = makeDiagnosisCollection({makeDb,ObjectID});
        editDiagnosis = makeEditDiagnosis({diagnosisCollection});
    });

    it('successfull diagnosis update',async ()=>{
        const newFakeDiagnosis = makeFakeDiagosis();
        const insertedDiagnosis = await diagnosisCollection.insert(newFakeDiagnosis);

        const updateFakeDiagnosis = makeFakeDiagosis({
            id:insertedDiagnosis.id,
            patientId:insertedDiagnosis.patientId,
            createdOn:insertedDiagnosis.createdOn});

        const updatedDiagnosis = await editDiagnosis(updateFakeDiagnosis);
        
        expect(insertedDiagnosis).not.toMatchObject(updatedDiagnosis);

    });

    it('must include an id',()=>{
        const newFakeDiagnosis = makeFakeDiagosis();

        expect(editDiagnosis(newFakeDiagnosis)).rejects.toThrow('You must supply an id.');
    });

    it('must have a patient id',()=>{
        const updateFakeDiagnosis = makeFakeDiagosis({patientId:null});

            expect(editDiagnosis(updateFakeDiagnosis)).rejects.toThrow('You must supply an id.')

    });

    it('Problems in a diagnosis must be defined',()=>{

        const updateFakeDiagnosis = makeFakeDiagosis({
            id:faker.random.uuid(),
            patientId:faker.random.uuid(),
            problems:null});

        expect(editDiagnosis(updateFakeDiagnosis)).rejects.toThrow('Diangosis must have a defined problem.')

    });

    afterAll(()=>{
        clearDb('diagnosis');
        closeDb();
    });
});