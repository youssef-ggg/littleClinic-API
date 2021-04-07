const faker = require("faker");

const makeGetByPatientId = require('./getByPatientId');
const makeFakeDiagnosis = require('../../__test__/fixtures/diagnosis.js');

describe('get diagnosis log by patient id.',()=>{

    it('get diagnosis log success',async()=>{

        const fakePatientId = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakePatientId
            }
        }
        const getByPatientId = makeGetByPatientId({
            listDiagnosisByPatientId:patientId=>{

                const diagnosisLog = [];
                for(i=0;i<3;i++){
                    diagnosisLog.push(makeFakeDiagnosis());
                }
                
                return diagnosisLog;
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const response = await getByPatientId(request);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        //TODO::make better expect statments

    });

    it('wrong verification token',async ()=>{

        const fakePatientId = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakePatientId
            }
        }

        const getByPatientId = makeGetByPatientId({
            listDiagnosisByPatientId:patientId=>{
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
        const actual = await getByPatientId(request);
        expect(actual).toEqual(expected);

    });
});