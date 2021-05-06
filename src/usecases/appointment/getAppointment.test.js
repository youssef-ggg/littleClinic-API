const {ObjectID} = require('mongodb');


const makeGetAppointment = require('./getAppointment');
const makeAppointmentCollection = require('../../dataAcces/appointment');
const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');

describe('get single appointment',()=>{

    let appointmentCollection,getAppointment;

    beforeAll(()=>{
        appointmentCollection = makeAppointmentCollection({makeDb,ObjectID});
        getAppointment = makeGetAppointment({appointmentCollection});
    });

    it('successfull request',async ()=>{
        const fakeAppointment = makeFakeAppointment();
        const insertedAppointment = await appointmentCollection.insert(fakeAppointment);
        const returnedAppointment = await getAppointment({id:insertedAppointment.id});
       
        expect(returnedAppointment).toMatchObject(insertedAppointment);
    });

    it('appointment dosen\'t exist',async ()=>{
        
        const returnedAppointment = await getAppointment({id:'6093e70de4b8c070a5a926c9'});
       
        expect(returnedAppointment).toBe(null);
    });

    afterAll(()=>{
        clearDb('appointments');
        closeDb();
    });
});