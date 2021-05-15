const faker = require('faker');

const {jwtVerifyToken} = require('../../jwtAuthorization');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');
const makeGetByDateDuration = require('./getByDateDuration');

describe('get appointment by duration.',()=>{

    it('successfull request',async ()=>{

        const weekDuration = 7;
        const startDate = new Date();
        startDate.setHours(0,0,0);
        const endDate = new Date();
        endDate.setDate(startDate.getDate()+weekDuration);
        endDate.setHours(23,59,59);

        const request  = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                startDate:startDate.getTime(),
                endDate:endDate.getTime()
            }
        }

        const fakeAppointmentList = [];

        for (let index=0;index<3;index++){

            const fakeAppointment = makeFakeAppointment({date:faker.date.soon(6).getTime()});
            fakeAppointmentList.push(fakeAppointment);
        }

        const getByDateDuration = makeGetByDateDuration({
            listByDuration:({startDate,endDate})=>{
                return fakeAppointmentList;

            },
            jwtVerifyToken:(httpRequest)=>{
                return {statusCode:200}
            }
        });

        const response = await getByDateDuration(request);

        expect(response.statusCode).toBe(200);
        expect(response.headers).toMatchObject({'Content-Type':'application/json'});

        for (let index = 0;index <3;index++){   
            
            expect(response.body[index]).toMatchObject(fakeAppointmentList[index]);
        }
    });

    it('needs authorization',async()=>{
        const weekDuration = 7;
        const startDate = new Date();
        startDate.setHours(0,0,0);
        const endDate = new Date();
        endDate.setDate(startDate.getDate()+weekDuration);
        endDate.setHours(23,59,59);

        const request  = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                startDate:startDate.getTime(),
                endDate:endDate.getTime()
            }
        }

        const fakeAppointmentList = [];

        for (let index=0;index<3;index++){

            const fakeAppointment = makeFakeAppointment({date:faker.date.soon(6).getTime()});
            fakeAppointmentList.push(fakeAppointment);
        }

        const getByDateDuration = makeGetByDateDuration({
            listByDuration:({startDate,endDate})=>{
                return fakeAppointmentList;

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
        const actual = await getByDateDuration(request);
        expect(actual).toEqual(expected);
    });

    it('reports errors',async()=>{
        const weekDuration = 7;
        const startDate = new Date();
        startDate.setHours(0,0,0);
        const endDate = new Date();
        endDate.setDate(startDate.getDate()+weekDuration);
        endDate.setHours(23,59,59);

        const request  = {
            headers:{
                'Content-Type':'application/json',
            },
            query:{
                startDate:startDate.getTime(),
                endDate:endDate.getTime()
            }
        }

        const fakeAppointmentList = [];

        for (let index=0;index<3;index++){

            const fakeAppointment = makeFakeAppointment({date:faker.date.soon(6).getTime()});
            fakeAppointmentList.push(fakeAppointment);
        }

        const getByDateDuration = makeGetByDateDuration({
            listByDuration:({startDate,endDate})=>{
                throw Error('BOOM can\'t display list error!');
            },
            jwtVerifyToken:(httpRequest)=>{
                return {statusCode:200}
            }
        });

        const expected = {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 400,
            body: { error: 'BOOM can\'t display list error!' }
        };

        const actual = await getByDateDuration(request);

        expect(actual).toEqual(expected);


    });
});