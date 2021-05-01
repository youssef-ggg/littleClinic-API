module.exports = function buildMakeAppointment(){

    return function makeAppointment(
        {
            id,
            title,
            patientName,
            date,
            patientId = null,
            createdOn = Date.now(),
            modifiedOn = Date.now(),
        } = {}
    ){
        if(!title||title=='')
            throw new Error('Appointment must have a title!')
        if(!patientName || patientName == '')
            throw new Error('Appointment must have patient name!');
        if(!date || date =='')
            throw new Error('Appointment must have a date.');

        return Object.freeze({
            getId:()=>id,
            getTitle:()=>title,
            getPatientName:()=>patientName,
            getDate:()=>date,
            getPatientId:()=>patientId,
            getCreatedOn:()=>createdOn,
            getModifiedOn:()=>modifiedOn,
        })

    }
}