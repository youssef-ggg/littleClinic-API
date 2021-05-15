const {ObjectID} = require('mongodb');
const faker = require('faker');

const makeAppointmentCollection = require('../../dataAcces/appointment');
const makeListByDuration = require('./listByDuration');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');

const makeFakeAppointment = require('../../__test__/fixtures/appointment');

describe('list appointment by duration',()=>{

    let appointmentCollection,listByDuration;
    beforeAll(()=>{
        appointmentCollection = makeAppointmentCollection({makeDb,ObjectID});
        listByDuration = makeListByDuration({appointmentCollection});
    });

    it('get appointments by week',async ()=>{
        
        const fakeAppointmentList = [];

        for (let index=0;index<3;index++){

            const fakeAppointment = makeFakeAppointment({date:faker.date.soon(6).getTime()});
            const insertedAppointment = await appointmentCollection.insert(fakeAppointment);
            fakeAppointmentList.push(insertedAppointment);
        }

        const weekDuration = 7;
        const startDate = new Date();
        startDate.setHours(0,0,0);
        const endDate = new Date();
        endDate.setDate(startDate.getDate()+weekDuration);
        endDate.setHours(23,59,59);

        const appointmentList = await listByDuration({startDate,endDate});

        fakeAppointmentList.sort((el1,el2)=>{
            if(el1.date > el2.date)
                return 1;
            if(el1.date < el2.date)
                return -1;
        });

        for (let index = 0;index <3;index++){   
            
            expect(fakeAppointmentList[index]).toMatchObject(appointmentList[index]);
        }
    });


    afterAll(()=>{
        clearDb('appointments');
        closeDb();
    });

});