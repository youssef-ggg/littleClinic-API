const {ObjectID} = require('mongodb');

const makeAppointmentCollection = require('../../dataAcces/appointment');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');
const makeAddAppointment = require('./addAppointment');

describe('Add appointment.',()=>{

    let appointmentCollection,addAppointment;
    beforeAll(()=>{
        appointmentCollection = makeAppointmentCollection({makeDb,ObjectID});
        addAppointment = makeAddAppointment({appointmentCollection});
    });

    it('insert appointment to the database',async ()=>{

        const newAppointment = makeFakeAppointment();
        const insertedAppointment = await addAppointment(newAppointment);

        for(key in newAppointment){
            expect(newAppointment[key]).toEqual(insertedAppointment[key]);
        }
    });

    it('appointments can\'t have the same date',async()=>{
        const newAppointment = makeFakeAppointment();
        const insertedAppointment = await addAppointment(newAppointment);
        
        const reinsertAppointment = await addAppointment(newAppointment);

       expect(reinsertAppointment).toMatchObject( {
            statusCode:409,
            errorMessage:'Two appointments can\'t have the same date and time.',
        });
    });

    afterAll(()=>{
        clearDb('appointment');
        closeDb();
    });
});