import React,{ useState} from 'react'
import {useSelector , useDispatch } from "react-redux"
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { ScrollView , Alert } from 'react-native'
import {  Snackbar } from 'react-native-paper';
import changeTravelState from "../../functions/travels/changeTravelState"


const Scan =({route , navigation})=> {

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("envoi en cours");

    const token=useSelector(state => state.token.token)
    const {travel}= route.params
    const dispatch=useDispatch()

    const onSuccess = e => {
        setVisible(true)
        setMessage("envoi en cours") 
        changeTravelState(token,travel.id,e.data,Alert.alert,dispatch)
        .then(()=>navigation.goBack())
        
      };
    
      const onDismissSnackBar = () => setVisible(false);


    return (
        <ScrollView>

            <QRCodeScanner
                onRead={onSuccess}
            />
             <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'fermez',
                onPress: () => {
                    // Do something
                },
                }}>
                {message}
            </Snackbar>
        </ScrollView>
    )
}

export default Scan; 