import get_storage from "./get_storage";

const get_token=async(callback)=>{
    await get_storage("token")
    .then(token=>{
        if(token!=null)
        callback({type:"SET_TOKEN",payload:token})
        else 
        callback({type:"LOGOUT"})
    })
}
export default get_token;