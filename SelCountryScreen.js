
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Button,AsyncStorage,ScrollView } from 'react-native';
import { Entypo  } from '@expo/vector-icons'; 
export function SelCountryScreen({ navigation,route }) {
    const[name,setName]=useState(route.params.name==="United States"?"USA":route.params.name);
    const[data,setData]=useState({});
    const[fav,setFav]=useState(false);
    const[arr,setArr]=useState([]);
    const[population,setPopulation]=useState(null);
    useEffect(()=>{
      check();
      fetch(`https://covid-19-data.p.rapidapi.com/country?name=${name}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "fd53eefed3msh026b9ba68a91498p19918fjsndd7a94aad9c7",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
        }
      })
    .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson[0]);
          console.log(responseJson[0])
        })
    .catch(err => {
      console.error(err);
    });
    fetch(`https://world-population.p.rapidapi.com/population?country_name=${route.params.name}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fd53eefed3msh026b9ba68a91498p19918fjsndd7a94aad9c7",
		"x-rapidapi-host": "world-population.p.rapidapi.com"
	  }
    })
        .then((response) => response.json())
        .then((responseJson) => {
          setPopulation(responseJson.body.population);
        })
        .catch(err => {
          console.error(err);
        });
    },[]);
    const check=async()=>{
      let dat=await AsyncStorage.getItem("Favs");
      if(dat){
      if(dat.includes(name)){
        setFav(true);
      }
      else{
        setFav(false);
      }
    }
    };
    const dataView=<View style={{height:"83%"}}>
    <Text style={styles.text}>Confirmed Cases:</Text>
    <Text style={[styles.text2,{color:"yellow"}]}>{data.confirmed} ({(data.confirmed/population).toFixed(2)}%)</Text>

    <Text style={styles.text}>Recovered:</Text>
    <Text style={[styles.text2,{color:"green"}]}>{data.recovered} ({((data.recovered/population)*100).toFixed(2)}%)</Text>

    <Text style={styles.text}>Critical Cases:</Text>
    <Text style={[styles.text2,{color:"red"}]} > {data.critical}({((data.critical/population)*100).toFixed(2)}%)</Text>
    <Text style={styles.text}>Deaths:</Text>
    <Text style={[styles.text2,{color:"grey"}]}>{data.deaths}({((data.deaths/population)*100).toFixed(2)}%)</Text>
    <Text style={[styles.text,{fontSize:10,color:"white"}]}>Last Updated: {data.lastUpdate}</Text>
   </View>;
    const saveData=async(name)=>{
      let temp= await AsyncStorage.getItem("Favs");
      await AsyncStorage.setItem("Favs",temp+`,${name}`);
      
    };
    const remove=async()=>{
      let item=await AsyncStorage.getItem("Favs");
    const arr=item.split(",");
    const array=arr.filter((item)=>item!=="null");
    array.forEach((value,index)=>{
      if(value===name){
        array.splice(index,1);
      }
    })
    const upArr=array.join(",");
    await AsyncStorage.setItem("Favs",upArr);
    }
    const emptyS=<Entypo onPress={()=>{
      setFav(true);
      saveData(name);
    }}style={{marginLeft:"4%"}} name="star-outlined" size={45} color="#104691" />
    const filledS=<Entypo onPress={()=>{
      setFav(false);
      remove();

    }}  style={{marginLeft:"4%"}}name="star" size={45} color="#104691" /> 
  return (
	  <ScrollView>
      <View style={styles.container}>
      <View style={{flexDirection:"row"}}>
      <Text style={styles.Head}>{name}</Text>
      {fav===false?emptyS:filledS}
      </View>
      <Text style={styles.text}>Total Population:</Text>
      <Text style={[styles.text2,{fontSize:35}]}>{population}</Text>
      {data!==undefined?dataView:null}
      </View>
	  </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      paddingTop:"20%",
      flex: 1,
      backgroundColor: '#EFC9A4',
      alignItems: 'center',
      },
    Head:{
      textAlign:'center',
      fontSize:40,
      fontWeight:'bold',
      color:'#104691'
    },
    star:{
      marginTop:0,
    },
    text:{
      color:"white",
      fontWeight:"bold",
      marginTop:20,
      fontSize:18,
      color:"#104691",
      textAlign:'center',
    
    },
    text2:{
      color:"white",
      fontWeight:"bold",
      marginTop:20,
      fontSize:20,
      textAlign:'center',
      borderBottomWidth:1,
      borderBottomColor:"#104691"
    }
  });
