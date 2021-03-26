const faker = require("faker");
const makeCreateDiagnosis = require('./createDiagnosis.js');
const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis.js');
const diagnosisCollection = require("../../dataAcces/diagnosis.js");

describe('create diagnosis controller',()=>{

    it('diagnosis created successfully',async ()=>{

        const fakeDiagnosis = makeFakeDiagnosis();
        const fakeId = faker.random.uuid();
        fakeDiagnosis['id']  = fakeId;
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakeDiagnosis
        }
        const createDiagnosis = makeCreateDiagnosis({
            addDiagnosis:fakeUser=>{
                const {password,...createdUser} = fakeUser;
                return createdUser;
            },
            jwtVerifyToken:request=>{ 
                return {
                    statusCode:200
                }
            }
        });
        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:201,
            body:{...fakeDiagnosis}
        }
        const actual = await createDiagnosis(request);
        expect(actual).toEqual(expected);     
    });

    it('wrong verification token',async ()=>{
        const fakeDiagnosis = makeFakeDiagnosis();
        const fakeId = faker.random.uuid();
        fakeDiagnosis['id']  = fakeId;
        
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:fakeDiagnosis
        }
        const createDiagnosis = makeCreateDiagnosis({
            addDiagnosis:fakeDiagnosis=>{
                
                return fakeDiagnosis;
            },
            jwtVerifyToken:request=>{ 
                return {
                    statusCode:403,
                    body:{
                        error:'forbidden.'
                    }
                }
            }
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }
        const actual = await createDiagnosis(request);
        expect(actual).toEqual(expected);

    });

    it('reports user errors',async()=>{
        const createDiagnosis = makeCreateDiagnosis({
            addDiagnosis: () => {
              throw Error('BOOM!')
            },
            jwtVerifyToken:request=>true
          })
          const fakeDiagnosis = makeFakeDiagnosis();
          const request = {
            headers: {
              'Content-Type': 'application/json',
            },
            body: fakeDiagnosis
          }
          const expected = {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: { error: 'BOOM!' }
          };
          const actual = await createDiagnosis(request);
          expect(actual).toEqual(expected);
    });
});