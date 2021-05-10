const faker = require('faker');
const {jwtVerifyToken} = require('../../jwtAuthorization');

const makeFakeAppointment = require('../../__test__/fixtures/appointment');
const makeUpdateAppointment = require('./updateAppointment');

describe('update appointment controller',()=>{

    it('update appointment sucessfully',async ()=>{

        const updateAppointmentModel = makeFakeAppointment();
        updateAppointmentModel.id =faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:updateAppointmentModel.id
            },
            body:{...updateAppointmentModel}
        }

        const updateAppointment = makeUpdateAppointment({
            editAppointment:(editedAppointmentData)=>editedAppointmentData,
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
            body:{...updateAppointmentModel}
        }

        const actual = await updateAppointment(request);
        expect(actual).toMatchObject(expected);
    });

    it('unauthorized user request',async ()=>{

        const updateAppointmentModel = makeFakeAppointment();
        updateAppointmentModel.id =faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:updateAppointmentModel.id
            },
            body:{...updateAppointmentModel}
        }

        const updateAppointment = makeUpdateAppointment({
            editAppointment:(editedAppointmentData)=>editedAppointmentData,
            jwtVerifyToken
        });

        const expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:403,
            body:{error:'forbidden.'}
        }

        const actual = await updateAppointment(request);
        expect(actual).toEqual(expected);

    });

    it('appointment doesnt exist',async ()=>{

        const updateAppointmentModel = makeFakeAppointment();
        updateAppointmentModel.id =faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                id:updateAppointmentModel.id
            },
            body:{...updateAppointmentModel}
        }

        const updateAppointment = makeUpdateAppointment({
            editAppointment:(editedAppointmentData)=>{
                throw new RangeError('Appointment not found.');
            },
            jwtVerifyToken:request=>{ 
                return {
                    statusCode:200
                }
            }
        });

        expected = {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:404,
            body:{ error: 'Appointment not found.'}
        }
        
        const actual = await updateAppointment(request);
        expect(actual).toEqual(expected);
    });
});