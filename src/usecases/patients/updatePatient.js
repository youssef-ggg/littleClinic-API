const {makePatient} = require('../../models');
const medicalRecord = require('../../models/medicalRecord');
const getUserById = require('../users/getUserById');

module.exports = function makeUpdatePatient({patientsCollection}){

    return async function updatePatient({id,...changes}){
      
        const checkIdHex = /^[0-9A-Fa-f]{24}/;
        
        if(!id)
            throw new Error('You must supply an id.');
        if(!checkIdHex.test(id))
            throw new TypeError('Invalid id.');
        const existing = await patientsCollection.findById({id});
       
        if(!existing){
            throw new RangeError('Comment not found.');
        }
        const updatedPatient = makePatient({id,...changes});
        
        return await patientsCollection.update({
            id:updatedPatient.getId(),
            name:updatedPatient.getName(),
            phoneNumber:updatedPatient.getPhoneNumber(),
            gender:updatedPatient.getGender(),
            birthDate:updatedPatient.getBirthDate(),
            balance:updatedPatient.getBalance(),
            totalExpensis:updatedPatient.getTotalExpensis(),
            createdOn:updatedPatient.getCreatedOn(),
            medicalRecordID:updatedPatient.getMedicalRecordID()

        }); 
    }
}
 