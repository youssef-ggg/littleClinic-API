module.exports = function makeTransactionCollection({makeDb,ObjectID}){

    return Object.freeze({
        insert,
        findAll,
    });

    async function insert(financialTransaction){

        try {
            const db = await makeDb();
            const result = await db.collection('financialTransaction').insertOne(financialTransaction);
            const insertedInfo = result.ops[0];
            const {_id,...insertedTranaction} = insertedInfo;
            return {id:_id.toString(),...insertedTranaction};
        } catch (error) {
            return error;
        }
    }

    async function findAll(){
        try {
            const db = await makeDb();
            const result  = await db.collection('financialTransaction').find();
            return (await result.toArray()).map(({ _id: id, ...found }) => ({
                id:id.toString(),
                ...found
                })
            );
        } catch (error) {
            return error;
        }
    }
}