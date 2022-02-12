const { ObjectID } = require('mongodb')

const { makeDb, clearDb, closeDb } = require('../../__test__/fixtures/db')
const makePatientCollection = require('../../dataAcces/patients')
const makeFakePatient = require('../../__test__/fixtures/patient')
const makeListPatientsByField = require('./listPatientByField')

describe('list patients by field', () => {
    let patientsCollection, listPatientsByField
    beforeAll(() => {
        patientsCollection = makePatientCollection({ makeDb, ObjectID });
        listPatientsByField = makeListPatientsByField({ patientsCollection });
    })

    it('list patients', async () => {
        const patients = [];
        const patientNames = ['mohammed', 'Mahmoud', 'Karim', 'Samar', 'Nadia', 'maria']

        for (let index = 0; index < 6; index++) {
            const fakePatient = makeFakePatient({ name: patientNames[0] })
            const { id, ...fakePatientData } = fakePatient
            patients.push(fakePatientData)
            await patientsCollection.insert(fakePatientData)
        }

        const patientsByNameM = ['mohammed', 'Mahmoud', 'maria']
        const fieldName = "name"
        const fieldRegex = '.*m.*'
        const caseSensitive = false
        const patientsListedByField = await listPatientsByField({ fieldName, fieldRegex, caseSensitive })
        patientsListedByField.forEach(patient => {
            expect(patientsByNameM.includes(patient.name)).toBe(true)
        })
    })

    it('searh regex case sensitive', async () => {
        const patientsByNameM = ['mohammed', 'Mahmoud']
        const fieldName = "name"
        const fieldRegex = '.*m.*'
        const caseSensitive = false
        const patientsListedByField = await listPatientsByField({ fieldName, fieldRegex, caseSensitive })
        patientsListedByField.forEach(patient => {
            expect(patientsByNameM.includes(patient.name)).toBe(true)
        })
    })

    afterAll(() => {
        clearDb('patients')
        closeDb()
    })
})