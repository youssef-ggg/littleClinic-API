const makeFakePatient = require('../__test__/fixtures/patient');
const buildMakePatient = require('./patient');


describe('patient',()=>{
    it('create active patient ',()=>{
        const makePatient = buildMakePatient();
        const fakePatient = makeFakePatient();
        const patient = makePatient(fakePatient);

        expect(patient.getActive()).toBe(true);
    });

    it('patient must have a name',()=>{
        
        const fakePatient = makeFakePatient({name:null});
        const makePatient = buildMakePatient();

        expect(() => makePatient(fakePatient)).toThrow('Patient must have a name.')
    });

    it('patient name least length three characters',()=>{
        
        const fakePatient = makeFakePatient({name:'as'});
        const makePatient = buildMakePatient();

        expect(() => makePatient(fakePatient)).toThrow('Patient name must be at least 3 charachters.')
    });

    it('patient must have biological gender',()=>{
        
        const fakePatient = makeFakePatient({gender:''});
        const makePatient = buildMakePatient();

        expect(() => makePatient(fakePatient)).toThrow('patient must have a biological gender.')
    });

    it('patient must have a birth date.',()=>{
        
        const fakePatient = makeFakePatient({birthDate:null});
        const makePatient = buildMakePatient();

        expect(() => makePatient(fakePatient)).toThrow('patient must have a birth date.')
    });

});