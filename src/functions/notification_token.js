import get_storage from './get_storage';
import urls from "./Urls"

const send_notification_token=async(token)=>{

    const axios=require("axios");
    axios.defaults.timeout = 10000;

    await get_storage('token')
    .then(auth_token=>{
        console.log("the token from send_notification token ",token);
        axios({
            method:'post',
            url:urls.sendNotificationToken,
            headers: { 'authorization': `Token ${auth_token}`},
            data:{
                token:token,
            }
        })
        .then(response=>{
            console.log("resonse from send_notification_token /reducers/notification/RgisterToken",response.data);
        })
        .catch((error) => {
            console.log("error from send_notification_token /reducers/notification/RgisterToken");
            // handle error
            console.log(error);
        })
    })
}

export default send_notification_token;