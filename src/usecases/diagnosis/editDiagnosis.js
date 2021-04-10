module.exports = function makeEditDiagnosis({diagnosisCollection}){

    return async function editDiagnosis(updatedDiagnosis){

        const {id,...changes} = updatedDiagnosis;
      
        if (!id) {
            throw new Error('You must supply an id.');
        }

        const exists = await diagnosisCollection.findById({id});

        if(!exists){
            throw RangeError('Diagnosis not found.');
        }
        if(!changes.patientId || changes.patientId == ''){
            throw new Error('Diagnosis must have patient id.')
        }
        if(!changes.problems || changes.problems.length == 0){
            throw new Error('Diangosis must have a defined problem.');
        }

        const updatedDiagnosisData = await diagnosisCollection.update({ ...exists,...changes, modifiedOn: null });
        
        return updatedDiagnosisData;
    }
}
 