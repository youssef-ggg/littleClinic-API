const { fake } = require('faker');
const faker = require('faker');

const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis');
const makeUpdateDiagnosis = require('./updateDiagnosis');


describe('update diagnosis controller',()=>{

    it('update diagnosis sucessfully',async ()=>{

        const fakeDiagnosis = makeFakeDiagnosis();
        // fakeDiagnosis['id'] = faker.random.uuid();
        const fakeDiagnosisId = faker.random.uuid()
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:fakeDiagnosisId
            },
            body:{...fakeDiagnosis}
        }

        const updateDiagnosis = makeUpdateDiagnosis({
            editDiagnosis:(editedDiagnosisData)=>editedDiagnosisData,
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

        const actual = await updateDiagnosis(request);
        expect(actual).toMatchObject(expected);


    });

    it('unauthorized user request,',async ()=>{

        const fakeDiagnosis = makeFakeDiagnosis();
        fakeDiagnosis['id'] = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:fakeDiagnosis.id
            }
        }

        const updateDiagnosis = makeUpdateDiagnosis({
            editDiagnosis:(editedDiagnosisData)=>{
                throw new Error('must not reach list diagnosis function.')
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

        const actual = await updateDiagnosis(request);
        expect(actual).toEqual(expected);
    });

    it('reports updated users errors',async ()=>{

        const fakeDiagnosis = makeFakeDiagnosis();
        fakeDiagnosis['id'] = faker.random.uuid();

        const updateDiagnosis = makeUpdateDiagnosis({
            editDiagnosis: (diagnosisData) => {
              throw Error('BOOM!')
            },
            jwtVerifyToken:request=>true
          })
          
          const request = {
            headers: {
              'Content-Type': 'application/json',
            },
            params:{
                id:fakeDiagnosis.id
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
          const actual = await updateDiagnosis(request);
          expect(actual).toEqual(expected);
    });
});