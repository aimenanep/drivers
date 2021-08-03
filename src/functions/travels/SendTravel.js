import urls from '../Urls';

const axios=require('axios')
axios.defaults.timeout = 10000;

const send_travel=(token,travel,resolve,reject)=>{
    axios({
        method:'post',
        url:urls.NewTravel,
        headers: { 'authorization': `Token ${token}`},
        data:{
            date_time:travel.date_time,
            departure:travel.departure,
            departure_name:travel.departure_name,
            long:travel.long,
            lat:travel.lat,
            destination:travel.destination,
            destination_name:travel.destination_name,
        },
        
    })
    .then(response=>{
        //console.log(response);
        if (response.status==201)
            resolve()
        else 
            reject(response)    
    })
    .catch(error=>{
       // console.log(error);
        reject(error)
    })
}
export default send_travel;