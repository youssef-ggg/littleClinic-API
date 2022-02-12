module.exports = function makeListPatientsByField({ patientsCollection }) {

    return async function listPatientByField({ fieldName, fieldRegex, caseSensitive }) {


        if (typeof (fieldRegex) == 'string') {
            caseSensitive = caseSensitive == 'true' ? true : false

            if (caseSensitive) {
                fieldRegex = new RegExp(fieldRegex)
            } else {
                fieldRegex = new RegExp(fieldRegex, 'i')
            }
        } else {
            throw new Error('fieldRegex must be a regular expresion of type string')
        }
        return patientsCollection.findByField({ fieldName, fieldRegex })
    }
}