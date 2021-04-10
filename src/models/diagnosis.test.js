const makeFakeDiagosis = require('../__test__/fixtures/diagnosis');
const buildMakeDiagnosis = require('./diagnosis');

describe('diagnosis model',()=>{

    it('make diagnosis model',()=>{
        
        const fakeDiagnosis = makeFakeDiagosis();
        const makeDiagnosis = buildMakeDiagnosis();
        const diagnosis = makeDiagnosis(fakeDiagnosis);

        expect(fakeDiagnosis).toMatchObject({
            patientId:diagnosis.getpatientId(),
            cheifComplaint:diagnosis.getCheifComplaint(),
            medications:diagnosis.getMedications(),
            treatment:diagnosis.getTreatment(),
            orders:diagnosis.getOrders(),
            problems:diagnosis.getProblems(),
            createdOn:diagnosis.getCreatedOn(),
            modifiedOn:diagnosis.getModifiedOn(),
        });
    });

    it('diagnosis needs patient id',()=>{
        const fakeDiagnosis = makeFakeDiagosis({patientId:null});
        const makeDiagnosis = buildMakeDiagnosis();

        expect(() => makeDiagnosis(fakeDiagnosis)).toThrow(
            'must have a patient\'s id.'
          );

    });

    it('diagnosis must have a cheif compliant',()=>{
        const fakeDiagnosis = makeFakeDiagosis({cheifComplaint:null});
        const makeDiagnosis = buildMakeDiagnosis();

        expect(() => makeDiagnosis(fakeDiagnosis)).toThrow(
            'A diagnosis must have a Cheif Compliant.'
          );
    });

    it('must have a diagonised problem',()=>{
        const fakeDiagnosis = makeFakeDiagosis({problems:null});
        const makeDiagnosis = buildMakeDiagnosis();

        expect(() => makeDiagnosis(fakeDiagnosis)).toThrow(
            'must have a diagonised problem.'
          );
    });
});