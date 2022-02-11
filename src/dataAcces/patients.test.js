const { ObjectID } = require('mongodb')
const faker = require('faker')
const { makeDb, closeDb, clearDb } = require('../__test__/fixtures/db')
const makePatientCollection = require('./patients')
const makeFakePatient = require('../__test__/fixtures/patient')

describe('patient db', () => {
    let patientCollection

    beforeAll(() => {
        patientCollection = makePatientCollection({ makeDb, ObjectID })
    })

    it('find like by field', async () => {
        const names = ['Mohammed', 'mahamoud', 'karim', 'sara']
        const inserts = await Promise.all(
            [
                makeFakePatient({ name: names[0], phoneNumber: 1520123 }),
                makeFakePatient({ name: names[1], phoneNumber: 1680858 }),
                makeFakePatient({ name: names[2], phoneNumber: 8890123 }),
                makeFakePatient({ name: names[3], phoneNumber: 6760123 })
            ].map(patientCollection.insert)
        )
        let fieldName = 'name'
        let fieldRegex = /.*m.*/i
        const namesWithM = ['Mohammed', 'mahamoud', 'karim']
        const found = await patientCollection.findByField({ fieldName, fieldRegex })
        found.forEach(patient => {
            console.log()
            expect(namesWithM.includes(patient.name)).toBe(true)
        })

    })

    afterAll(() => {
        clearDb('patients')
        closeDb()
    })
})