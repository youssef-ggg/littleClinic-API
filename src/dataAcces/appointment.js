module.exports = function makeAppointmentCollection({makeDb,ObjectID}){

    return Object.freeze({
        insert,
        findById,
        findByPatientId,
        findByPatientIdActive,
        findByPatientIdDue,
        findByDateDuration,
        findByDateTime,
        removeById,
        update
    });

    async function insert(appointment){
        try {
            const db = await makeDb();
            const result = await db.collection('appointments').insertOne(appointment);
            const insertedInfo = result.ops[0];
            const {_id,...insertedAppointment} = insertedInfo;
            return {id:_id.toString(),...insertedAppointment};

        } catch (error) {
            return error;
        }
    }

    async function findById({id}){
        try {
            const db = await makeDb();
            const result  = await db.collection('appointments').find({_id:ObjectID(id)});
            return (await result.toArray()).map(({_id : id,...found})=>({
                id:id.toString(),
                ...found
            }));
        } catch (error) {
            return error;
        }
    }

    async function findByPatientId({patientId}){
        try{
            const db = await makeDb();
            const result = await db.collection('appointments').find({patientId}).sort({date:-1});
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
            }));

        }catch(error){
            return error;
        }
    }

    async function findByPatientIdActive({patientId}){
        try{
            const db = await makeDb();
            const result = await db.collection('appointments')
                .find({patientId,date:{$gt:Date.now()}}).sort({date:-1});
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
            }));

        }catch(error){
            return error;
        }
    }

    async function findByPatientIdDue({patientId}){
        try{
            const db = await makeDb();
            const result = await db.collection('appointments')
                .find({patientId,date:{$lt:Date.now()}}).sort({date:-1});
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
            }));

        }catch(error){
            return error;
        }
    }

    async function findByDateDuration({startDate,endDate}){
        
        try{
            const db = await makeDb();
            const result = await db.collection('appointments')
                .find({date:{$gt:(startDate.getTime()),$lt:(endDate.getTime())}}).sort({date:1});
            
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
            }));
        }catch(error){
            return error;
        }
    }

    async function findByDateTime({date}){
        try {
            const db = await makeDb();
            const result = await db.collection('appointments')
                .find({date});
            
            const found = await result.toArray();
            if (found.length === 0) {
              return null
            }
            const { _id: id, ...insertedInfo } = found[0]
            return { id, ...insertedInfo }
        } catch (error) {
            return error;
        }
    }
    
    async function removeById(appointmentInfo){
        const {id} = appointmentInfo;
        
        try {
            const db = await makeDb();
            const result = await db.collection('appointments').deleteOne({_id:ObjectID(id)});

            return result;
        } catch (error) {
            return error;
        }
    }
    async function update(appointmentData)
    {
        const {id,...setNewAppointment} = appointmentData
        try {
            const db = await makeDb();
            const result = await db.collection('appointments').updateOne({_id:ObjectID(id)},
            {
                $set:{...setNewAppointment}
            });

            return result;
            
        } catch (error) {
            return error;
        }
    }
}