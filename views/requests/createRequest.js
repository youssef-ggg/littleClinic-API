
module.exports = async function createRequest(request){

    const {postData,moudleTitle,requestRoute,axiosAuth} = request;
    try {
        
        const response = await axiosAuth.post(requestRoute,postData);
        if(response.status == 201)
        {
            const {data} = response;
            const {user} = data;
            toastNotify(`${moudleTitle} created successfully.`,'success');
            userSingleView(user);
        }
    } 
    catch (error) {
        //TODO create error log
        console.log(error);
        
    }
}