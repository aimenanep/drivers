import React ,{useState,useEffect}  from 'react'
import  TopBar from "./src/layouts/TopBar"
import { createStackNavigator } from '@react-navigation/stack';
import Travels from "./src/screens/travels"
import Details from "./src/screens/travels/Details"
import { useSelector,useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Login from "./src/screens/Login"
import get_regions from './src/functions/GetRegions';
import get_token from './src/functions/get_token';
import send_notification_token from './src/functions/notification_token';
import Scan from './src/screens/travels/Scan';

const Stack = createStackNavigator();

export default function App() {

  const dispatch = useDispatch();
  const is_authenticated=useSelector(state => state.sessions.isLoggedIn)

  useEffect(()=>{ //component did mount
      get_regions(dispatch);
      get_token(dispatch);
    return ()=>{ //component  unmount
    }
  },[])

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("Notification TOKEN:", token.token);
      send_notification_token(token.token)
      // dispatch({type:"SET_NOTIFICATION_TOKEN",payload:token.token})
      // if(is_authenticated)
      // get_storage('token').then(auth_token=>send_notification_token(auth_token,token.token))
      
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  if (is_authenticated)
  return (
    <>
      <TopBar/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
           name="Home" 
           component={Travels} 
           options={{ 
            title: 'Liste des courses',
            headerStyle: { backgroundColor: '#000' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: '#ffffff',
          }}
          />
          <Stack.Screen
           name="Details" 
           component={Details} 
           options={{ 
             title: 'Detail de la course',
             headerStyle: { backgroundColor: '#000' },
             headerTitleStyle: { color: 'white' },
             headerTintColor: '#ffffff',
          }}
          />
          <Stack.Screen
           name="Scan" 
           component={Scan} 
           options={{ 
             title: 'Scanner QR',
             headerStyle: { backgroundColor: '#000' },
             headerTitleStyle: { color: 'white' },
             headerTintColor: '#ffffff',

          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
  else 
  return(
    <Login/>
  )
}
