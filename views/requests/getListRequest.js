
module.exports = async function getListRequest({requestRoute,axiosAuth}){

    try {
        const response = await axiosAuth.get(requestRoute);

        const {data} = response;
        if (data == '' || data == null || data == undefined)
            return null;
        return data;
    } catch (error) {
        //TODO:: console log
        toastNotify(`${error.response.data.error}`,'fail');
        return error.response.data;
    }
}