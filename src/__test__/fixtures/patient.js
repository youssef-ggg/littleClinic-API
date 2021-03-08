const faker = require('faker');


module.exports = function makeFakePatient(overrides){
    const patient = {
        id : faker.random.uuid(),
        name : faker.name.findName(),
        phoneNumber : faker.phone.phoneNumber(),
        gender : faker.name.gender(),
        birthDate : faker.date.past(),
        balance : faker.finance.amount(),
        numberOfVisits : faker.random.number(100),//used for discounts
        active : true,
        createdOn : Date.now(),
        modifiedOn : Date.now(),
        medicalRecordId : faker.random.uuid()
    }

    return {
        ...patient,
        ...overrides
    }
}