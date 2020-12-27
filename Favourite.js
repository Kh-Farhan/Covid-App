import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity,View,Button, AsyncStorage,FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
export function FavouriteScreen({ navigation }) {
  const [counTemp,setCounTemp]=useState([]);
  useEffect(()=>{
    load();
  });
  const load=async()=>{
    let data=await AsyncStorage.getItem("Favs");
    if(data){
    const arr=data.split(",");
    const array=arr.filter((item)=>item!=="null")
    setCounTemp(array);
    }
    else{
      setCounTemp([]);
    }
};
  const remove=async(name)=>{
    let item=await AsyncStorage.getItem("Favs");
    if(item){
  const arr=item.split(",");
  const array=arr.filter((item)=>item!=="null");
  array.forEach((value,index)=>{
    if(value===name){
      array.splice(index,1);
    }
  })
  const upArr=array.join(",");
  await AsyncStorage.setItem("Favs",upArr);
  }}

  const view=<View style={styles.list}>
    {<FlatList 
          keyExtractor={(item, index) => 'key'+index}
          data={counTemp}
          renderItem={({ item }) => (
            
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Selective",{name:item})
          }} style={styles.countries}><View style={{flexDirection:"row"}}><Text style={styles.countriesT}>{item}</Text><Entypo onPress={remove.bind(this,item)}  style={{position: 'absolute', right: 0}}name="star" size={23} color="#104691" /></View></TouchableOpacity>
           
          
        )}
      />}
  </View>
    return (
      <View style={styles.container}>
        <Text style={styles.Head}>Favouites</Text>
        {counTemp.length!==0?view:null}
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EFC9A4',
      alignItems: 'center',
    },
    Head:{
      textAlign:'center',
      fontSize:35,
      fontWeight:'bold',
      color:'#104691',
      marginBottom:"2%"
    },
    list:{
      width:"100%"
    },
    countries:{
      borderWidth:1,
      padding:"4%",
      paddingLeft:"6%",
      borderColor:"#1F9DE7",
      height:50,
      alignItems:"stretch"
    },
    countriesT:{
      textAlign:"center",
      color:"#104691",
      fontSize:16,
      
    },
  });