import React from 'react'
import {useState} from "react";

import {View,ScrollView,ActivityIndicator,Image,TextInput,Alert } from "react-native";
import { Button } from 'react-native-paper';
import set_storage from '../functions/set_storage';
import { useSelector,useDispatch } from 'react-redux';



export default function Login() {

    const axios=require('axios')
    axios.defaults.timeout = 10000;


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [positionLoader, setpositionLoader] = useState("none")

    const dispatch=useDispatch()
    
    const connect=async()=>{
        setpositionLoader('flex');
        await axios.post("https://driver.anepcs.dz/api-auth/", {
            username: username,
            password: password
          })
          .then(function (response) {
            setpositionLoader('none');
            if(response.status==200)
                {
                    set_storage('token',response.data.token)
                    console.log(` the token ${response.data.token}`);
                    dispatch({type:"LOGIN"});
                    dispatch({type:"SET_TOKEN",payload:response.data.token});
                }
                
              
              console.log("response is "+response.data.token);
          })
          .catch(function (error) {
              console.log("error is ");
              console.log(error);
            setpositionLoader('none');
            console.log(error.code);
            
            if(error.code=="ECONNABORTED")
            {  
                Alert.alert("erreur","pas de connexion veullez réessayer")
            }
            else
            Alert.alert("erreur","identifiants invalides")
          });
    }



    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems: "center" ,backgroundColor:"#0675bc"}}>
            <ActivityIndicator size="large" color="#0675bc" style={{display:positionLoader}}/>
        
        <View style={{backgroundColor:"rgba(0,0,0,.5)",padding:40,width:"90%",borderRadius:20}}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Image
                style={{marginBottom:50}}
                source={require(`../assets/logo.png`)}
            />
        </View>
            <View>

                <TextInput
                    style={{
                        backgroundColor: "#fefefefe",
                        width: "100%",
                        height: 45,
                        marginBottom: 20,
                        paddingLeft:20,
                        alignItems: "center",
                        color:"#000"
                    }}
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="#003f5c"
                    autoCapitalize="none"
                    onChangeText={(username) => setUsername(username)}
                />
                </View>
                
                <View >
                <TextInput
                    style={{
                        backgroundColor: "#fefefefe",
                        width: "100%",
                        height: 45,
                        marginBottom: 20,
                        paddingLeft:20,
                        alignItems: "center",
                        color:"#000"
                    }}
                    placeholder="Mot de passe."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(password) => setPassword(password)}
                />
                </View>
                <View style={[{ marginTop:20}]}>
                <Button color="#00a157" icon="login" mode="contained" onPress={connect} width="100%">
                    Connexion
                </Button>

                </View>
        </View>
        </ScrollView>   
    )
}
