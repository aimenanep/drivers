/**
 * @format
 */
 import React from 'react';
 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import store from './src/store';
 import {Provider} from 'react-redux';
 
 
 const application=()=>(
     <React.StrictMode>
         <Provider store={store}>
             <App />
         </Provider>
     </React.StrictMode>
 )
 AppRegistry.registerComponent(appName, () => application);
 