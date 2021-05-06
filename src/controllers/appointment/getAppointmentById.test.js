const faker = require('faker');

const makeGetAppointmentById = require('./getAppointmentById');
const {jwtVerifyToken} = require('../../jwtAuthorization');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');
const { fake } = require('faker');


describe('get appointment by id controller.',()=>{

    it('successfull request',async ()=>{

        const fakeAppointment = makeFakeAppointment();
        fakeAppointment['id'] = faker.random.uuid();
        
        const request  = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                id:fakeAppointment.id
            }
        }

        const getAppointmentById = makeGetAppointmentById({
            getAppointment:({id})=>{
                return {
                    ...fakeAppointment
                }

            },
            jwtVerifyToken:(httpRequest)=>{
                return {statusCode:200}
            }
        });

        const response = await getAppointmentById(request);

        expect(response.statusCode).toBe(200);
        expect(response.headers).toMatchObject({'Content-Type':'application/json'});
        expect(response.body).toMatchObject(fakeAppointment);
    });

    it ('authorization required',async ()=>{
        const fakeAppointment = makeFakeAppointment();
        fakeAppointment['id'] = faker.random.uuid();
        
        const request  = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                id:fakeAppointment.id
            }
        }

        const getAppointmentById = makeGetAppointmentById({
            getAppointment:({id})=>{
                return {
                    ...fakeAppointment
                }

            },
            jwtVerifyToken
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }

        const actual = await getAppointmentById(request);
        expect(actual).toEqual(expected);
    });

    it('appointment dosen\'t exist',async ()=>{
        const fakeAppointment = makeFakeAppointment();
        fakeAppointment['id'] = faker.random.uuid();
        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            query:{
                id:fakeAppointment.id
            }
        
        
        }
        const getAppointmentById = makeGetAppointmentById({
            getAppointment:({id})=>{
                return null;
            },
            jwtVerifyToken:()=>{
                return {
                    statusCode:200
                }
            }
        });

        const response = await getAppointmentById(request);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('appointment was not found.');
    });
});