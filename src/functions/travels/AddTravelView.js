import React ,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {StyleSheet,View,Text,TouchableOpacity,Alert,Modal,TextInput,Button,ActivityIndicator,ToastAndroid,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import urls from '../Urls';
import set_storage from '../SetStorage';
import get_travels from './getTravels';
import delete_travel from './DeleteTravel';
import DatePicker from 'react-native-date-picker'
import get_storage from '../GetStorage';
import {Picker} from '@react-native-picker/picker';
import GetLocation from 'react-native-get-location';
import LatLonToAdress from './LatLonToAdress';
import send_travel from './SendTravel';




const AddTravelView=(props)=>{

    const dispatch=useDispatch();
    const wilayass=useSelector(state => state.regions.wilayas)
    const [date, setDate] = useState(new Date())
    const [selected_wilaya, setWilaya] = useState(0)
    const [selected_commune, setCommune] = useState(0)
    const [selected_wilaya_destination, setWilayaDestination] = useState(0)
    const [selected_commune_destination, setCommuneDestination] = useState(0)
    const [departure_name, setDepartureName] = useState("")
    const [destination_name, setDestinationName] = useState("")
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [positionLoader, setpositionLoader] = useState("none")


    useEffect(()=>{ //component did mount
      console.log("add travel component did mount ");
      //console.log(wilayass);
      return ()=>{ //component  unmount
        console.log("add travel component did unmount ");
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
      ToastAndroid.show("veuillez réessayer", ToastAndroid.SHORT);
        const { code, message } = error;
        console.warn(code, message);
    })
    }
    
    const register_travel=()=>{
      setpositionLoader("flex")
      get_storage('token')
      .then(token=>{
        send_travel(token,{
          date_time:date,
          departure:selected_commune,
          departure_name:departure_name,
          long:lon,
          lat:lat,
          destination:selected_commune_destination,
          destination_name:destination_name,
        },()=>{
          setpositionLoader("none")
          props.setModalVisible(!props.modalVisible);
          ToastAndroid.show("votre demande a bien été prise en charge", ToastAndroid.SHORT);
          props.getting_travels()

        },()=>{
          setpositionLoader("none")
          ToastAndroid.show("veuillez renseigner tous les champs du formulaire et verifier votre connexion internet", ToastAndroid.SHORT);
        })
      })
      
    }
    

    

    const set_location_from_gps=(api_location)=>{
      wilayass.map(wilaya=>{
        wilaya.communes_list.map(commune=>{
          if(commune.name.toLowerCase()==api_location.town.toLowerCase())
          {
            setCommune(commune.id)
            setWilaya(wilaya.id)
            setDepartureName(api_location.road)
          }
            
        })
        
      })
    }
    return (
      <>
        <Modal
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
          
          props.setModalVisible(!props.modalVisible);
        }}
        backgroundColor="#0675bc"        
      >
        <View style={{alignItems: 'center',position:'absolute',top:0,left:0,backgroundColor:'#00a255',paddingVertical:12,textAlign:"center",width:"100%",height:51}}>
          <Text style={{color:"white"}}>DEMANDER UNE COURSE</Text>
        </View>
        <ScrollView>

        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>


         <View style={styles.box}>
         <ActivityIndicator size="large" color="#00a255" style={{display:positionLoader}}/>
            <Text styles={{color:"darkgray"}}>Départ:</Text>
              <View style={{ height:50}} >
                <View style={{flex: 1,flexDirection: "row",width:"100%",position: 'absolute'}}>
                  <View style={{ flex:2,}} >
                  <Picker
                    selectedValue={selected_wilaya}
                      onValueChange={(itemValue, itemIndex) =>setWilaya(itemValue)}
                      
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
                style={styles.input}
                placeholder="nom point de depart"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                onChangeText={(name) => setDepartureName(name)}
            />
           <TouchableOpacity 
           style={{flexDirection:'row'}}
           onPress={() => getloc()}
           >
           <Icon name="map-marker" size={15} color="darkgray" />
           <Text color="darkgray"> depuis ma localisation </Text>
           </TouchableOpacity>
          </View>
            

           
          <View style={[styles.box,{marginVertical:20,overflow:"hidden",alignItems:"center"}]}>
            <DatePicker
              date={date}
              onDateChange={setDate}
            />
          </View>

          

          <View style={styles.box}>
            <Text styles={{color:"darkgray"}}>Destination:</Text>
              <View style={{ height:50}} >
                <View style={{flex: 1,flexDirection: "row",width:"100%",marginBottom:100,position: 'absolute'}}>
                  <View style={{ flex:2,}} >
                  <Picker
                    selectedValue={selected_wilaya_destination}
                      onValueChange={(itemValue, itemIndex) =>setWilayaDestination(itemValue)}
                      
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
                style={styles.input}
                placeholder="Nom point d'arrivé"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                onChangeText={(name) => setDestinationName(name)}
            />
          </View>
          
          
            <View style={[styles.box,{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',}]}>
              <View style={{ flex:1,marginHorizontal:5}}>
                <Button
                  onPress={() => props.setModalVisible(!props.modalVisible)}
                  title="Anuller"
                  color="#00a255"
                  accessibilityLabel="Anuller la demande "
                  
              />
              </View>
              <View style={{ flex:1,marginHorizontal:5}}>
                <Button
                  onPress={() => register_travel()}
                  title="Confirmer"
                  color="#00a255"
                  accessibilityLabel="Anuller la demande "
                
              />
              </View>
            
            
            </View>
            
          </View>
        </View>
        </ScrollView> 
      </Modal>
      
    </>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
     // justifyContent: "center",
     // alignItems: "center",
      marginTop: 40,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
     // alignItems: "center",
/*      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
      */
    },

    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    box:{
      borderColor:"rgba(0,0,0,.05)",borderStyle:"solid",borderWidth:2,padding:20
    },
    input:{
      backgroundColor: "#fefefefe",
      width: '100%',
      height: 45,
      marginBottom: 20,
      paddingLeft:20,
      alignItems: "center",
    }
  });

export default AddTravelView;