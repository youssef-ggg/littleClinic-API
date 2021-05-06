const faker = require('faker');

const makeGetByPatientId = require('./getByPatientId');
const {jwtVerifyToken} = require('../../jwtAuthorization');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');

describe('get appointment by patient id controller.',()=>{

    it('successfull request',async ()=>{

        const fakeAppointment = makeFakeAppointment();

        fakeAppointment['patientId'] = faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeAppointment.patientId
            }
        }

        const getByPatientId = makeGetByPatientId({
            listAppointmentByPatientId:patientId=>{
                const appointmentLog = [];
                for(i=0;i<3;i++){
                    appointmentLog.push(makeFakeAppointment());
                }
                return appointmentLog;
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const response = await getByPatientId(request);

        // console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        
    });

    it ('return not found ',async ()=>{
        const fakeAppointment = makeFakeAppointment();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeAppointment.patientId
            }
        
        
        }
        const getByPatientId = makeGetByPatientId({
            listAppointmentByPatientId:patientId=>{
                return [];
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const response = await getByPatientId(request);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('no appointments found.');
        

    });

    it('authorization required',async ()=>{
        const fakeAppointment = makeFakeAppointment();

        fakeAppointment['patientId'] = faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeAppointment.patientId
            }
        }

        const getByPatientId = makeGetByPatientId({
            listAppointmentByPatientId:patientId=>{
                const appointmentLog = [];
                for(i=0;i<3;i++){
                    appointmentLog.push(makeFakeAppointment());
                }
                return appointmentLog;
            },
            jwtVerifyToken:jwtVerifyToken
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