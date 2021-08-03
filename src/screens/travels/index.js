import React ,{useState,useEffect} from 'react';
import {View,ScrollView,Text,Pressable,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { Title,Headline,Badge } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import get_travels from "../../functions/travels/getTravels";
import PushNotification from "react-native-push-notification";


export default function Travels({navigation}) {
    const dispatch=useDispatch()
    const travels=useSelector(state => state.travels.travels)
    const [loaderdisplay,SetLoaderDisplay]=useState('flex')
    useEffect(()=>{ //component did mount
        // dispatch({type:"SET_TITLE",payload:"home"})
        get_travels(dispatch)
        .then(()=>SetLoaderDisplay('none'))
        return ()=>{ //component  unmount
            
        }
      },[])
      console.log("**********************",travels);

      const travel_color=(travel)=>{
        if(travel.status=="en cours")
            return "#a11500"
        if(travel.status=="attente")
            return "#cd3299"
        if(travel.status=="initial")
            return "#bc4606"
        if(travel.status=="termine")
            return "#896e6e"
      }


      const icon_color=(travel)=>{
        if(travel.status=="en cours")
            return "#00a157"
        if(travel.status=="attente")
            return "yellowgreen"
        if(travel.status=="initial")
            return "#0675bc"
        if(travel.status=="termine")
            return "#a2a2a2"
      }

      travels.map(travel=>{
          const dateString=travel.date_time.replace("T"," ").replace("Z","")
          var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
          var dateArray = reggie.exec(dateString); 
          var dateObject = new Date(
            (+dateArray[1]),
            (+dateArray[2])-1, // Careful, month starts at 0!
            (+dateArray[3]),
            (+dateArray[4]),
            (+dateArray[5]),
            (+dateArray[6])
          );

          if (dateObject> new Date())
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: `Il est temps pour la course destination : ${travel.destination_name}. passager: ${travel.passenger.username}`, // (required)
            date: dateObject, // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeateType. Check 'Repeating Notifications' section for more info.
          });
      })
      

    return (
        <ScrollView onMomentumScrollEnd={()=> get_travels(dispatch)}>
            <ActivityIndicator size="large" color="#0675bc" style={{display:loaderdisplay}}/>
            {travels.map(travel=>(
            <Pressable onPress={()=>{navigation.navigate('Details', {travel})}}>
                <View style={{flexDirection:"row",marginVertical:5 , borderColor:"rgba(0,0,0,.1)",borderWidth:1,paddingVertical:5,marginHorizontal:10,backgroundColor:"#fff"}} key={travel.id}>
                <View style={{width:"15%",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
                    <MaterialCommunityIcons name="train-car" color={icon_color(travel)} size={40} />
                </View>
                <View style={{padding:8,width:"65%"}}>
                    <Title> {travel.destination_name} </Title>
                    <Text> <MaterialCommunityIcons name="clock-outline" color={"#a2a2a2"}  /> {travel.date_time.replace("T"," ").replace("Z"," ")} </Text>
                    <Text> <MaterialCommunityIcons name="account" color={"#a2a2a2"}  /> {travel.passenger.username} </Text>
                    <Text> <MaterialCommunityIcons name="phone" color={"#a2a2a2"}  /> {travel.passenger.phone} </Text>
                    <Badge style={{marginRight:"auto",marginTop:4,width:80, fontWeight:"bold", backgroundColor:travel_color(travel),color:"#fff",fontSize:13}}>{travel.status}</Badge> 
                </View>
                <View style={{width:"20%",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
                      <MaterialCommunityIcons name="arrow-right" color={"#030303"} size={20} />
                      
                </View>
            </View>
            </Pressable>    
    ))}
            
        </ScrollView>
        
    )
}
