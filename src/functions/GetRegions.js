import urls from './Urls';
import get_storage from './get_storage';
import set_storage from "./set_storage";



const get_regions=async(callback)=>{

    const axios=require("axios")
    axios.defaults.timeout = 8000;

    await get_storage("regions")
    .then(regions=>{
        
        if(regions!=null)
            callback({type:"SET_WILAYAS",payload:regions})
        else 
        axios({
            method:'get',
            url:urls.GetRegions,
        })
        .then(response=>{
            //console.log('response from get_regions',response.data);
            if(response.status==200)
            {
                set_storage("regions",response.data);
                callback({type:"SET_WILAYAS",payload:response.data})
                console.log(response.data);
            }
        })
        .catch(error=>{
            console.log('error from get_regions',error);
            get_regions(callback)
        })
    })
    
}

export default get_regions;