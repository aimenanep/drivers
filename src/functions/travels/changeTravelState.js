import urls from '../Urls';
import {Alert} from "react-native"
import get_travels from './getTravels';

const changeTravelState=async(token,id,code,callback,dispatch)=>{
    const axios = require("axios");
    axios.defaults.timeout = 10000;

    console.log("************************** the token ",token);
    console.log(urls.TravelStatus+""+id+"?code="+code);
    await axios({
        method:'GET',
        url:urls.TravelStatus+""+id+"?code="+code,
        headers: { 'authorization': `Token ${token}`},
    })
    .then(response=>{
        console.log('response from Change status',response.data);
        if (response.status==201)
         {callback( "QR SCAN", "envoyé avec succes");get_travels(dispatch)}
        else 
        callback( "QR SCAN", "envoyé avec succes"+response.status)
    })
    .catch((err)=>{
        // console.log(err.response);

        if (err.code === 'ECONNABORTED')
            callback( "Pas de connexion internet", "erreur")
        else
            callback( "QR SCAN ERREUR", "erreur")
        console.log( "error from componnents/home/deleteTravels.js ",err);
    })
    // .then(()=>{
    //     get_travels(dispatch)
    // })

}
export default changeTravelState;