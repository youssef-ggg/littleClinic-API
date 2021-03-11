const makeGetPatientByID = require('./getPatientByID');
const jwtAuthorization = require('../../jwtAuthorization');
const makeFakePatient = require('../../__test__/fixtures/patient');


describe('get patient by id',()=>{


    it('successfully get a patient',async ()=>{

        const fakePatient = makeFakePatient();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakePatient.id
            }
        }

        const getPatientByID = makeGetPatientByID({
            getPatient:id=>{
                    return fakePatient;
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const response = await getPatientByID(request);

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(fakePatient);

    });

    it('unauthorized request',async ()=>{

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
        }
        const {jwtVerifyToken} = jwtAuthorization;
        
        const getPatientByID = makeGetPatientByID({
            listPatients:()=>{
                throw new Error('should not reach here!');
            },
            jwtVerifyToken
        });

        const response = await getPatientByID(request);

        expect(response.statusCode).toBe(403);
        expect(response.body).toMatchObject({error:'forbidden.'});
    });

    it('reports list patients errors',async ()=>{
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query :{
                id:123
            }
        }

        const getPatientByID = makeGetPatientByID({
            getPatient:()=>{
                throw new Error('BOOM patient id request!')
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
            body: { error: 'BOOM patient id request!' }
          };
          const actual = await getPatientByID(request);
          expect(actual).toEqual(expected);

    });

});