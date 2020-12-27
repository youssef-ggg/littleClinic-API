module.exports = function makeListPatients({patientsCollection}){

    return async function listPatients(){
        return await patientsCollection.findAll();
    }
}