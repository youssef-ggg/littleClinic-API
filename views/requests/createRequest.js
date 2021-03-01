
module.exports = async function createRequest(request){

    const {postData,moduleTitle,requestRoute,axiosAuth} = request;
    try {
        
        const response = await axiosAuth.post(requestRoute,postData);
        if(response.status == 201)
        {
            const {data} = response;
            toastNotify(`${moduleTitle} created successfully.`,'success');

            return data;
        }
    } 
    catch (error) {
        //TODO create error log
        console.log(error);
        
    }
}