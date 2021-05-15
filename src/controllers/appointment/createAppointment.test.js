const faker = require("faker");
const makeCreateAppointment = require('./createAppointment');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');

describe('create appointment controller',()=>{

    it('appointment created successfully',async ()=>{

        const newAppointment = makeFakeAppointment();
        newAppointment.id = faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:newAppointment
        }

        const createAppointment = makeCreateAppointment({
            addAppointment:newAppointment=>newAppointment,
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
            body:{...newAppointment}
        }
        const actual = await createAppointment(request);
        expect(actual).toEqual(expected);     
        
    });

    it('verification problems',async()=>{

        const newAppointment = makeFakeAppointment();
        newAppointment.id = faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:newAppointment
        }

        const createAppointment = makeCreateAppointment({
            addAppointment:newAppointment=>newAppointment,
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
        const actual = await createAppointment(request);
        expect(actual).toEqual(expected);
    });

    it('reports user errors',async()=>{
        const newAppointment = makeFakeAppointment();
        newAppointment.id = faker.random.uuid();

        const request = {
            headers:{
                'Content-Type':'application/json'
            },
            body:newAppointment
        }

        const createAppointment = makeCreateAppointment({
            addAppointment:newAppointment=>{
                throw Error('BOOM CANT CREATE APPOINTMENT!')
            },
            jwtVerifyToken:request=>{ 
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
            body: { error: 'BOOM CANT CREATE APPOINTMENT!' }
        };

        const actual = await createAppointment(request);
        expect(actual).toEqual(expected);
    });
});