import React,{ useState} from 'react'
import {useSelector } from "react-redux"
import {Text,ScrollView,View, Pressable , Linking , Platform , StyleSheet , TouchableOpacity} from "react-native";
import { Subheading , Title , Button } from 'react-native-paper';
import openMap from 'react-native-open-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import changeTravelState from "../../functions/travels/changeTravelState"


export default function Details({route , navigation}) {
    const maps=  Platform.OS === 'ios' ? 'maps://app?saddr=' : 'google.navigation:q='
    const {travel}= route.params

    
    

    return (
        <ScrollView style={{padding:15}}>
            <View style={{borderWidth:1,borderColor:"rgba(0,0,0,.3)",padding:9,backgroundColor:"#fff",marginBottom:15}}>
            <Title style={{color:"#030303"}}>
                 <MaterialCommunityIcons name="clock-outline" color={"#0675bc"}  size={20}  /> {travel.date_time.replace("T"," ").replace("Z","")} 
            </Title>
          </View>

            <View style={{borderWidth:1,borderColor:"rgba(0,0,0,.3)",padding:5,backgroundColor:"#fff",marginBottom:15}}>
                <Title style={{color:"#0675bc"}}> <MaterialCommunityIcons name="map-marker-multiple" color={"#0675bc"}  size={20} />  Destination </Title>
                <Subheading style={{fontWeight:"bold"}}> {travel.destination_name} </Subheading> 
                <Subheading style={{fontWeight:"bold"}}> {travel.destination.name} </Subheading> 
            </View>

            
            <View style={{borderWidth:1,borderColor:"rgba(0,0,0,.3)",padding:9,backgroundColor:"#fff",marginBottom:15}}>
                <Title style={{color:"#0675bc"}} >
                    <MaterialCommunityIcons name="account-circle" color={"#0675bc"}  size={20}  />  Passager
                </Title>
                <Subheading style={{fontWeight:"bold"}}> {travel.passenger.username}  </Subheading> 
                    <Subheading style={{fontWeight:"bold"}}> {travel.passenger.phone} </Subheading>
            </View>
                            

            <View style={{borderWidth:1,borderColor:"rgba(0,0,0,.3)",padding:5,backgroundColor:"#fff",marginBottom:15}}>
                <Title style={{color:"#0675bc"}}> <MaterialCommunityIcons name="google-maps" color={"#0675bc"}  size={20} />  Départ </Title>
                <Subheading style={{fontWeight:"bold"}}> {travel.departure_name} </Subheading> 
                <Subheading style={{fontWeight:"bold"}}> {travel.departure.name} </Subheading> 
                <Subheading style={{fontWeight:"bold"}}> {travel.long} {travel.lat} </Subheading> 
                <Button  mode="contained" onPress={() => Linking.openURL(`${maps}${travel.lat}+${travel.long}`)} style={{backgroundColor:"#000",marginVertical:15}}>
                ouvrir avec maps
                </Button>
            </View>


            
            <View style={{paddingVertical:70}}>
                <Button  icon="qrcode" mode="contained" onPress={() => navigation.navigate('Scan',{travel})} style={{backgroundColor:"#00a157"}}>
                    Scanner QR
                </Button>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topText: {
      padding: 32,
      color: '#fff',
      marginBottom:20,
      backgroundColor:"#0675bc",
      fontWeight:"bold",
      position:"absolute",
      width:"100%",
      textAlign:"center"
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });
