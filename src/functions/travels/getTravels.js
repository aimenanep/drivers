import urls from '../Urls';
import get_storage from '../get_storage';
import set_storage from '../set_storage';

const get_travels=async(callback)=>{
    const axios = require("axios");
    axios.defaults.timeout = 10000;

    await get_storage("token")
    .then(token=>{
        axios({
            method:'get',
            url:urls.travelList,
            headers: { 'authorization': `Token ${token}`},
        })
        .then(response=>{
           // console.log('response from get_travels ',response.data);
            if (response.status==200)
            {
                callback({type:"SET_TRAVELS",payload:response.data})
                set_storage("travels",response.data)
            }
            

            console.log(response.data);
        })
        .catch((err)=>{
            console.log("error from componnents/home/getTravels.js ",err);
            get_storage("travels")
            .then(travels=>{
                if(travels!=null)
                callback({type:"SET_TRAVELS",payload:travels})
            })
        })
    })
    
}

export default get_travels;