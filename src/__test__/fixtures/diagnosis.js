const faker = require('faker');

module.exports = function makeFakeDiagnosis(overrides){
    const diagnosis = {
        patientId:faker.random.uuid(),
        cheifComplaint:faker.random.words(),
        problems:faker.random.arrayElements(),
        medications:faker.random.arrayElements(),
        treatment:faker.random.arrayElements(),
        orders:faker.random.arrayElements(),       
        createdOn:Date.now(),
        modifiedOn:Date.now(),
    }
    return {
        ...diagnosis,
        ...overrides
    }
}