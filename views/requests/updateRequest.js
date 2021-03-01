
module.exports = async function updateRequest(request){

    const {patchData,moudleTitle,requestRoute,axiosAuth} = request;

    try {
        
        const response = await axiosAuth.patch(requestRoute,patchData);
        if(response.status == 201){
            const {data} = response;
            toastNotify(`${moudleTitle} updated successfully.`,'success');
            return data;
        }
    } catch (error) {
        //TODO:: console log
        //console.log(error.response.data);
        toastNotify(`${error.response.data.error}`,'fail');
        return error.response.data;
    }
}