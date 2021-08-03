
const axios=require("axios")

const LatLonToAdress=async (lat,lon,callback)=> {

    axios({
        method:'get',
        url:`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=6fe043affabf4500adfbe7547ac6240d&lang=fr`
    })
    .then(response=>{
      
            console.log("response ",response.data.results[0].components);
            callback(response.data.results[0].components);
        
        
    })
    .catch(error=>{
        console.log("errrorr determining location name ",error);
       
    })
}

export default LatLonToAdress;