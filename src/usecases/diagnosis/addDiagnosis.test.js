const {ObjectID} = require('mongodb');

const makeDiagnosisCollection = require('../../dataAcces/diagnosis');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeAddDiagnosis = require('./addDiagnosis');
const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis');


describe('add diagnosis',()=>{

    let diagnosisCollection,addDiagnosis;
    beforeAll(()=>{
        diagnosisCollection = makeDiagnosisCollection({makeDb,ObjectID});
        addDiagnosis = makeAddDiagnosis({diagnosisCollection});
    });

    it('successfully added diangosis',async()=>{
        const newFakeDiagnosis = makeFakeDiagnosis();
        const insertedDiagnosis = await addDiagnosis(newFakeDiagnosis);
       
        for(key in newFakeDiagnosis)
        {
            expect(newFakeDiagnosis[key]).toEqual(insertedDiagnosis[key]);

        }
    });

    it('must have a cheif compliant',()=>{
        const newFakeDiagnosis = makeFakeDiagnosis({cheifComplaint:null});

        expect(addDiagnosis(newFakeDiagnosis))
        .rejects.toEqual(new Error('A diagnosis must have a Cheif Compliant.'));
    });

    it('must have a diagonised problem.',()=>{
        const newFakeDiagnosis = makeFakeDiagnosis({problems:null});

        expect(addDiagnosis(newFakeDiagnosis))
        .rejects.toEqual(new Error('must have a diagonised problem.'));
    });

    afterAll(()=>{
        clearDb('diagnosis');
        closeDb();
    });
});