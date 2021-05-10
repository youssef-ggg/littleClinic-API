const {ObjectID} = require('mongodb');
const faker = require('faker');

const {makeDb,clearDb,closeDb} = require('../../__test__/fixtures/db');
const makeAppointmetCollection = require('../../dataAcces/appointment');
const makeEditAppointment = require('./editAppointment');
const makeFakeAppointment = require('../../__test__/fixtures/appointment');

describe('edit appointment',()=>{

    let appointmentCollection,editAppointment;
    beforeAll(()=>{
        appointmentCollection = makeAppointmetCollection({makeDb,ObjectID});
        editAppointment = makeEditAppointment({appointmentCollection});
    });

    it('edit appointment',async ()=>{
        const newAppointment = makeFakeAppointment();
        const insertedAppointment = await appointmentCollection.insert(newAppointment);

        const updateAppointment = makeFakeAppointment({
            id:insertedAppointment.id,
            patientId:insertedAppointment.patientId,
            createdOn:insertedAppointment.createdOn});

        const updatedAppointment = await editAppointment(updateAppointment);

        expect(insertedAppointment).not.toMatchObject(updatedAppointment);
        expect(insertedAppointment.id).toBe(updatedAppointment.id);
        expect(insertedAppointment.patientId).toBe(updatedAppointment.patientId);
        expect(insertedAppointment.createdOn).toBe(insertedAppointment.createdOn);
    });

    it('Appointment dosen\'t exist',()=>{
        const newAppointment = makeFakeAppointment();

        expect(editAppointment(newAppointment)).rejects.toThrow('Appointment not found.');
    });

    afterAll(()=>{
        clearDb('appointments');
        closeDb();
    });
});