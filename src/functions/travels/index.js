import React ,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity,Alert,ActivityIndicator,ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import get_travels from './getTravels';
import delete_travel from './DeleteTravel';
import AddTravelView from './AddTravelView';

 function Home() {
    
  const [modalVisible , setmodalVisible ] = useState(false);

    const dispatch=useDispatch();
    const travels=useSelector(state => state.travels.travels);

    const [positionLoader, setpositionLoader] = useState("none")

    useEffect(()=>{ //component did mount
        console.log("component did mount Home");
        getting_travels();
        return ()=>{ //component  unmount
          console.log("component did unmount Home");
        }
      },[])

      const getting_travels=()=>{
        setpositionLoader("flex")
        get_travels(dispatch).then(()=>{
          setpositionLoader("none")
        })
      }
      const confirm_delete_travel=(id)=>{
        Alert.alert(
            "Confirmer supression",
            "etes vous sur de vouloir suprimmer",
            [
              {
                text: "Oui suprimmer la demande ",
                onPress: () => {
                  delete_travel((display)=>{setpositionLoader(display)},id,dispatch,()=>{
                    ToastAndroid.show("veuillez réessayer", ToastAndroid.SHORT);  
                  })
                },
                style: "confirm",
              },
              {
                text: "Anuller",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
          );
      }
      const contentchange=(w,h)=>{
            
      }
    return (
    <>    
    <AddTravelView
    modalVisible={modalVisible}
    setModalVisible={setmodalVisible}
    getting_travels={getting_travels}
    />
      <View style={{flex:1}}>
            <ScrollView 
            onContentSizeChange={(w,h)=>{}}
            onMomentumScrollBegin={()=>{}/*getting_travels()*/}
            >
              <ActivityIndicator size="large" color="#00a255" style={{display:positionLoader}}/>
              {travels.map(travel=>(
                <>
                  <View  key={travel.id} style={styles.singleItem}>
                    <View style={styles.iconContainer}>
                      <Icon name="taxi" size={30} color="darkgray" />
                      <Text style={styles.badge}> {travel.status} </Text>
                      <Text style={{color:"#00a255"}}>{travel.code}</Text>
                    </View>
                    <View style={styles.dataInfo}>
                        <Text>
                            <Text style={{color:"darkgray"}}>
                                    {travel.date_time.replace("T", " ").replace("Z", " ").split(".")[0]} 
                            </Text>   
                        </Text>
                        <Text>
                            <Text style={{color:"darkgray"}}> depart: </Text>
                            <Text> {travel.departure.name} </Text>
                        </Text>
                        <Text>
                            <Text style={{color:"darkgray"}}> info: </Text>
                            <Text>  {travel.departure_name} </Text>
                        </Text>
                        <Text>
                            <Text style={{color:"darkgray"}}> destination: </Text>  
                            <Text> {travel.destination.name}  </Text>
                        </Text>
                        <Text>
                            <Text style={{color:"darkgray"}}> info: </Text>  
                            <Text>  {travel.destination_name} </Text>
                        </Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity onPress={()=>confirm_delete_travel(travel.id)}>
                            <Icon name="trash" size={30} color="darkgray" />
                        </TouchableOpacity>
                  </View>
                  </View>
                  </>
              ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={()=>setmodalVisible(true)}>
              <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
      </View>      
    </>        
    )
}

const styles = StyleSheet.create({
    singleItem: {
      alignSelf: 'stretch',
      flexDirection: 'row', // row
      alignItems: 'center',
      justifyContent: 'space-between', // center, space-around
      paddingVertical:20,
      marginHorizontal:10,
      marginTop:30,
      borderColor:"rgba(0,0,0,.05)",
      borderStyle:"solid",
      borderWidth:2,
    },
    iconContainer:{
        width:"20%",
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center"
    },
    dataInfo:{
        width:"65%",
        paddingLeft:7
    },
    badge:{
        backgroundColor:"#00a255",
        color:"#fff",
        fontWeight:"bold",
        minWidth:80,
        paddingHorizontal:5,
        textAlign:"center",
        marginLeft:"auto",
        marginRight:15,
        marginTop:5,
        borderRadius:5,
        fontSize:12
    },
    actionContainer:{
        width:"15%",
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center" 
    },
    addButton:{
      backgroundColor:"#00a255",
      width:50,
      height:50,
      alignContent:"center",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:25,
      marginLeft:'auto',
      marginRight:25,
      marginBottom:20,
    }
  });

  export default Home;  