
module.exports = async function GetByQueryRequest({getData,requestRoute,query,axiosAuth}){

    try {
        const response = await axiosAuth.get(`${requestRoute}/query?${query}=${getData[query]}`);

        const {data} = response;
        if (data == '' || data == null || data == undefined)
            return null;
        return data;

    } catch (error) {
        //TODO:create error log
        console.log(error);
    }
}