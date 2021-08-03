import React ,{useState,useEffect} from 'react';
import {View,ScrollView,Text} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { Title } from 'react-native-paper';
export default function Home() {
    const dispatch=useDispatch()

    useEffect(()=>{ //component did mount
        // dispatch({type:"SET_TITLE",payload:"home"})
        return ()=>{ //component  unmount
            
        }
      },[])

    return (
        <ScrollView>
            <Title style={{textAlign:"center",backgroundColor:"#dedede", marginTop:0,padding:5,color:"#000"}}> Home View </Title>
        </ScrollView>
    )
}
