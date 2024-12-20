const {ObjectID} = require('mongodb');

const makeGetDiagnosis = require('./getDiagnosis');
const makeDiagnosisCollection = require('../../dataAcces/diagnosis');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis');

describe('get single diagnosis',()=>{

    let diagnosisCollection,getDiagnosis;

    beforeAll(()=>{
        diagnosisCollection = makeDiagnosisCollection({makeDb,ObjectID});
        getDiagnosis = makeGetDiagnosis({diagnosisCollection});
    });

    it('successfull request',async ()=>{
        const fakeDiagnosis = makeFakeDiagnosis();
        
        const insertedDiagnosis = await diagnosisCollection.insert(fakeDiagnosis);
        const returnedDiagnosis = await getDiagnosis({id:insertedDiagnosis.id});
       
        expect(returnedDiagnosis).toMatchObject(insertedDiagnosis);
    });

    afterAll(()=>{
        clearDb('diagnosis');
        closeDb();
    });
});