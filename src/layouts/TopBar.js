import React from 'react';
import {View,StyleSheet,Text , Image} from 'react-native';
import { useSelector } from 'react-redux';

const TopBar=()=> {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={{height:50,resizeMode:"contain"}} />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"#0675bc",
        padding:15

    }
})
export default TopBar;