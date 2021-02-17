
module.exports = async function updateRequest(request){

    const {patchData,moudleTitle,requestRoute,axiosAuth} = request;

    try {
        
        const response = await axiosAuth.patch(requestRoute,patchData);
        if(response.status == 201){
            const {data} = response;
            const {user} = data;
            toastNotify(`${moudleTitle} updated successfully.`,'success');
            userSingleView(user);
        }
    } catch (error) {
        //TODO:: console log
        console.log(error);
    }
}