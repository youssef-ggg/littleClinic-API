const faker = require('faker');

const makeGetDiagnosisById = require('./getDiagnosisById');
const jwtAuthorization = require('../../jwtAuthorization');
const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis');

describe('get diagnosis by id controller.',()=>{

    it('successfull request',async ()=>{

        const fakeDiagnosis = makeFakeDiagnosis();
        fakeDiagnosis['id'] = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeDiagnosis.id
            }
        }

        const getDiagnosisById = makeGetDiagnosisById({
            getDiagnosis:({id})=>{
                return{
                    ...fakeDiagnosis
                }
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });
        const response = await getDiagnosisById(request);

        expect(response.statusCode).toBe(200);
        expect(response.headers).toMatchObject({'Content-Type':'application/json'});
        expect(response.body).toMatchObject(fakeDiagnosis);

    });

    it('wrong verification token',async ()=>{

        const fakeDiagnosis = makeFakeDiagnosis();
        fakeDiagnosis['id'] = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeDiagnosis.id
            }
        }

        const getDiagnosisById = makeGetDiagnosisById({
            getDiagnosis:({id})=>{
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

        const actual = await getDiagnosisById(request);
        expect(actual).toEqual(expected);

    });

});