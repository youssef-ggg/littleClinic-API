const makeFakeAppointment = require('../__test__/fixtures/appointment')
const buildMakeAppointment = require('./appointment');

describe('appointment',()=>{

    it('make model successfully',()=>{
        const fakeAppointment = makeFakeAppointment();

        const makeAppointment = buildMakeAppointment();
        
        const newAppointment = makeAppointment(fakeAppointment);

        expect(fakeAppointment).toMatchObject({
            title:newAppointment.getTitle(),
            patientName:newAppointment.getPatientName(),
            date:newAppointment.getDate(),
            patientId:newAppointment.getPatientId(),
            createdOn:newAppointment.getCreatedOn(),
            modifiedOn:newAppointment.getModifiedOn(),
        });
    });

    it('must have a title',()=>{

        const fakeAppointment = makeFakeAppointment({title:null});

        const makeAppointment = buildMakeAppointment();

        expect(() => makeAppointment(fakeAppointment)).toThrow(
            'Appointment must have a title!'
          );
    });

    it('Appointment must have patient name!',()=>{
        const fakeAppointment = makeFakeAppointment({patientName:null});

        const makeAppointment = buildMakeAppointment();

        expect(() => makeAppointment(fakeAppointment)).toThrow(
            'Appointment must have patient name!'
          );
    });

    it('Appointment must have a date.',()=>{
        const fakeAppointment = makeFakeAppointment({date:null});

        const makeAppointment = buildMakeAppointment();

        expect(() => makeAppointment(fakeAppointment)).toThrow(
            'Appointment must have a date.'
          );
    });
});