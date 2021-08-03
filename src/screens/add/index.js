import React ,{useState,useEffect} from 'react';
import {View,ScrollView,Text,StyleSheet,ActivityIndicator,Pressable, Alert} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { Headline , Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {TextInput } from "react-native-paper";
import GetLocation from 'react-native-get-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import send_travel from "../../functions/travels/SendTravel"
import LatLonToAdress from "../../functions/travels/LatLonToAdress"

const AddTravel=()=> {

    const dispatch=useDispatch();
    const wilayass=useSelector(state => state.regions.wilayas)
    const [date, setDate] = useState(new Date())
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0)
    const [selected_wilaya, setWilaya] = useState(0)
    const [selected_commune, setCommune] = useState(0)
    const [selected_wilaya_destination, setWilayaDestination] = useState(0)
    const [selected_commune_destination, setCommuneDestination] = useState(0)
    const [departure_name, setDepartureName] = useState("")
    const [destination_name, setDestinationName] = useState("")
    const [lat, setLat] = useState("0")
    const [lon, setLon] = useState("0")
    const [positionLoader, setpositionLoader] = useState("none")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    var days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const regions=useSelector(state => state.regions.wilayas);
    const token=useSelector(state => state.token.token);
    
    useEffect(()=>{ //component did mount
        // dispatch({type:"SET_TITLE",payload:"home"})
        return ()=>{ //component  unmount
            
        }
      },[])



      const getloc=async()=>{
        setpositionLoader("flex")
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
      })
      .then(location => {
        setpositionLoader("none")
          console.log(location);
          setLat(location.latitude)
          setLon(location.longitude)
          LatLonToAdress(location.latitude,location.longitude,set_location_from_gps)
          
      })
      .catch(error => {
        setpositionLoader("none")
          Alert.alert("erreur","veuillez verifier que la localisation de l'appareil est bien activé , et réessayer ulterierment")
          const { code, message } = error;
          console.warn(code, message);
      })
      }

      const set_location_from_gps=(api_location)=>{
        wilayass.map(wilaya=>{
          wilaya.communes_list.map(commune=>{
            if(commune.postal_code==api_location.postcode)
            {
              setCommune(commune.id)
              setWilaya(wilaya.id)
              if(api_location.office!=undefined)
                setDepartureName(api_location.office)
            }
              
          })
          
        })
      }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    
    

    const register_travel=()=>{
      setpositionLoader("flex")

        console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
        send_travel(token,{
          date_time:`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
          // date_time:"2020-05-01 22:20",
          departure:selected_commune,
          departure_name:departure_name,
          long:lon,
          lat:lat,
          destination:selected_commune_destination,
          destination_name:destination_name,
        },()=>{
          setpositionLoader("none")
          Alert.alert("votre demande a bien été prise en charge");

          setDate(new Date())
          setHours(0);
          setMinutes(0)
          setWilaya(0)
          setWilayaDestination(0)
          setCommuneDestination(0)
          setDepartureName("")
          setDestinationName("")
          setLat("0")
          setLon("0")
          setDatePickerVisibility(false);
        },(error)=>{
          setpositionLoader("none")
          Alert.alert("veuillez renseigner tous les champs du formulaire et verifier votre connexion internet");
          console.log(error.response.data);
        })
    }


    return (
      <>
        <ScrollView>
           <Headline style={{textAlign:"center",backgroundColor:"#dedede", marginTop:0,padding:20,color:"#000"}}> Demander une course </Headline>
           
            <ActivityIndicator size="large" color="#0675bc" style={{display:positionLoader}}/>
            
            <View style={{padding:20}}>
                <Pressable 
                style={{flexDirection:"row"}}
                onPress={() => getloc()}
                >
                    <MaterialCommunityIcons name="map-marker" color="#0675bc" size={26} style={{}}/>
                    <Text> Lat:  {lon} </Text>
                    <Text> Lon: {lat} </Text>
                </Pressable>
            
            <Pressable onPress={showDatePicker} style={{marginTop:15}}>
                <View>
                        <Text style={{fontWeight:"bold",fontSize:20}}>Départ:</Text>
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}><Text style={{fontSize:17,backgroundColor:"black",marginLeft:2,borderRadius:8,color:"#fff",paddingHorizontal:10,}}>{days[date.getDay()]} {date.getDate()}-{date.getMonth()}-{date.getFullYear()} <Text style={{color:"#0675bc"}}>{date.getHours()} : {date.getMinutes()} </Text></Text></View>
                </View>
            </Pressable>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
                    <View style={{ height:50}} >
                    <View style={{flex: 1,flexDirection: "row",width:"100%",position: 'absolute'}}>
                    <View style={{ flex:2,}} >
                    <Picker
                        selectedValue={selected_wilaya}
                        onValueChange={(itemValue, itemIndex) =>setWilaya(itemValue)}
                        dropdownIconColor="#000"
                        
                        >
                            <Picker.Item  key={selected_wilaya} label={"wilaya"} value={0} />
                            {useSelector(state => state.regions.wilayas).map(wilaya=>(
                            <Picker.Item  key={wilaya.id} label={wilaya.name} value={wilaya.id} />
                            ))}
                    </Picker>
                    </View>
                    <View style={{ flex: 2,}} >
                    <Picker
                        selectedValue={selected_commune}
                        onValueChange={(itemValue, itemIndex) =>setCommune(itemValue)}
                        dropdownIconColor="#000"
                    >
                        <Picker.Item  key={selected_commune} label={"commune"} value={0} />
                        {useSelector(state => state.regions.wilayas).map(wilaya=>{
                            if(wilaya.id==selected_wilaya)
                            return wilaya.communes_list.map(commune=>(
                            <Picker.Item  key={commune.id} label={commune.name} value={commune.id} />
                            ))
                        })   
                        }
                    </Picker>
                    </View>
                </View>
                
                </View>
                <TextInput
                    label="nom point de départ"
                    value={departure_name}
                    onChangeText={text => setDepartureName(text)}
                />


        <View style={{paddingTop:30}}>
            <Text style={{fontWeight:"bold",fontSize:20}}>Destination:</Text>
              <View style={{ height:50}} >
                <View style={{flex: 1,flexDirection: "row",width:"100%",marginBottom:100,position: 'absolute'}}>
                  <View style={{ flex:2,}} >
                  <Picker
                    selectedValue={selected_wilaya_destination}
                      onValueChange={(itemValue, itemIndex) =>setWilayaDestination(itemValue)}
                      dropdownIconColor="#000"
                    >
                        <Picker.Item  key={selected_wilaya_destination} label={"wilaya"} value={0} />
                        {useSelector(state => state.regions.wilayas).map(wilaya=>(
                          <Picker.Item  key={wilaya.id} label={wilaya.name} value={wilaya.id} />
                        ))}
                  </Picker>
                  </View>
                <View style={{ flex: 2,}} >

                

                  <Picker
                  selectedValue={selected_commune_destination}
                  onValueChange={(itemValue, itemIndex) =>setCommuneDestination(itemValue)}
                  dropdownIconColor="#000"
                  >
                      <Picker.Item  key={selected_commune_destination} label={"commune"} value={0} />
                      {useSelector(state => state.regions.wilayas).map(wilaya=>{
                        if(wilaya.id==selected_wilaya_destination)
                        return wilaya.communes_list.map(commune=>(
                          <Picker.Item  key={commune.id} label={commune.name} value={commune.id} />
                        ))
                      })   
                      }
                  </Picker>
                </View>
              </View>
            </View> 
            <TextInput
                label="Nom point d'arrivé"
                value={destination_name}
                onChangeText={(name) => setDestinationName(name)}
            />
        </View>
        <Button icon="send" mode="contained" onPress={() => register_travel()} style={{marginTop:20}}>
              Envoyer
            </Button>
            </View>

           

        </ScrollView>
        </>
    )
}

const styles=StyleSheet.create({

})
export default  AddTravel;