module.exports = function buildMakeAppointment(){

    return function makeAppointment(
        {
            title,
            patientName,
            time,
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
        if(!time || time == '')
            throw new Error('Appointment must have a time.');
        if(!date || date =='')
            throw new Error('Appointment must have a date');

        return Object.freeze({
            getTitle:()=>title,
            getPatientName:()=>patientName,
            getTime:()=>time,
            getDate:()=>date,
            getPatientId:()=>patientId,
            getCreatedOn:()=>createdOn,
            getModifiedOn:()=>modifiedOn,
        })

    }
}