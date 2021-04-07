module.exports = function makeDiagnosisCollection({makeDb,ObjectID}){

    return Object.freeze({
        findAll,
        findByPatientId,
        findById,
        insert,
        update,
        removeById,
        removeMany
    });

    async function findAll(){
        try{
            const db = await makeDb();
            const result  = await db.collection('diagnosis').find({});
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
                })
            );
        }catch(error){
            return error;
        }
    }

    async function findByPatientId({patientId}){
        try {

            const db = await makeDb();
            const result = await db.collection('diagnosis').find({patientId});
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
            }));

        } catch (error) {
           return error;
        }
    }

    async function findById({id:_id}){
        try {
            const db = await makeDb();
            const result = await db.collection('diagnosis').find({_id:ObjectID(_id)});
            const found = await result.toArray();
            if(found.length === 0)
                return null;
            
            const {_id:id,...info} = found[0];
            return {id:id.toString(),...info};

        } catch (error) {
            return error;
        }
    }

    async function insert(diagnosisInfo){

        try{
            const db = await makeDb();
            const result = await db.collection('diagnosis').insertOne(diagnosisInfo);
            const insertedInfo = result.ops[0];
            const {_id,...insertedDiagnosis} = insertedInfo;
            return {id:_id.toString(),...insertedDiagnosis};

        }catch(error){
            return error;
        }

    }
    async function update(diagnosisData)
    {
        const {id,...setNewDiangosis} = diagnosisData
        try {
            const db = await makeDb();
            const result = await db.collection('diagnosis').updateOne({_id:ObjectID(id)},
            {
                $set:{...setNewDiangosis}
            });

            return result;
        } catch (error) {
            return error;
        }
    }

    async function removeById(diagnosisInfo){

        const {id} = diagnosisInfo;
        try{
            const db = await makeDb();
            const result =  await db.collection('diagnosis').deleteOne({_id:ObjectID(id)});

            return result;
        }catch(error){
            return error;
        }
    }
    //incomplete function
    async function removeMany(query){

        try {
            const db = await makeDb();
            const result = db.collection('diagnosis').deleteMany({...query});
        } catch (error) {
            return error;
            
        }
    }
}