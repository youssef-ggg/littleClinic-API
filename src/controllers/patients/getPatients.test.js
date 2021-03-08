const makeGetPatients = require('./getPatients');
const jwtAuthorization = require('../../jwtAuthorization');
const makeFakePatient = require('../../__test__/fixtures/patient');

describe('get patients list',()=>{

    it('get patients success',async ()=>{

        const patients = [];
        for (let index = 0;index <6;index++){
            const fakePatient = makeFakePatient();
            
            patients.push(fakePatient);
        }

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }

        const getPatients = makeGetPatients({
            listPatients:()=>{
                return patients;
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const response = await getPatients(request);

        const {statusCode,body} = response;
        expect(statusCode).toBe(200);
        for (let index = 0;index <6;index++){

            expect(body[index]).toMatchObject(patients[index]);
        }
    });

    it('unauthorized request',async ()=>{

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }
        const {jwtVerifyToken} = jwtAuthorization;
        
        const getPatients = makeGetPatients({
            listPatients:()=>{
                throw new Error('should not reach here!');
            },
            jwtVerifyToken
        });

        const response = await getPatients(request);

        expect(response.statusCode).toBe(403);
        expect(response.body).toMatchObject({error:'forbidden.'});
    });

    it('reports list patients errors',async ()=>{
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }

        const getPatients = makeGetPatients({
            listPatients:()=>{
                throw new Error('BOOM patient request!')
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const expected = {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: { error: 'BOOM patient request!' }
          };
          const actual = await getPatients(request);
          expect(actual).toEqual(expected);

    });
});