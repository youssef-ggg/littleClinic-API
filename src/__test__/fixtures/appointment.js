const faker = require('faker');

module.exports = function makeFakeAppointment(overrides){

    const appointment = {
        title : faker.name.title(),
        patientName : faker.name.findName(),
        date : faker.date.recent().getTime(),
        patientId : faker.random.uuid(),
        createdOn : Date.now(),
        modifiedOn : Date.now(),
    }

    return {
        ...appointment,
        ...overrides
    }

}