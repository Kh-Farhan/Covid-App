import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Button } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export function WorldScreen({ navigation }) {
    const[data,setData]=useState({});
    const[population,setPopulation]=useState(0);
    useEffect(() => {
      console.log("hello")
      fetch("https://covid-19-data.p.rapidapi.com/totals", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "fd53eefed3msh026b9ba68a91498p19918fjsndd7a94aad9c7",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
        }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson[0]);
        })
        .catch(err => {
          console.error(err);
        });
        fetch("https://world-population.p.rapidapi.com/worldpopulation", {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "fd53eefed3msh026b9ba68a91498p19918fjsndd7a94aad9c7",
            "x-rapidapi-host": "world-population.p.rapidapi.com"
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          setPopulation(responseJson.body.world_population);
          console.log(responseJson)
        })
        .catch(err => {
          console.error(err);
        });
    },[]);
   const dataView=<View style={{height:"83%"}}>
    <Text style={styles.text}>Confirmed Cases:</Text>
    <Text style={[styles.text2,{color:"yellow"}]}>{data.confirmed} ({(data.confirmed/population).toFixed(2)}%)</Text>

    <Text style={styles.text}>Recovered:</Text>
    <Text style={[styles.text2,{color:"green"}]}>{data.recovered} ({((data.recovered/population)*100).toFixed(2)}%)</Text>

    <Text style={styles.text}>Critical Cases:</Text>
    <Text style={[styles.text2,{color:"red"}]} > {data.critical}({((data.critical/population)*100).toFixed(2)}%)</Text>
    <Text style={styles.text}>Deaths:</Text>
    <Text style={[styles.text2,{color:"grey"}]}>{data.deaths}({((data.deaths/population)*100).toFixed(2)}%)</Text>
    <Text style={[styles.text,{fontSize:10,color:"white",
  }]}>Last Updated: {data.lastUpdate}</Text>
   </View>;
  
    return (
      <View style={styles.container}>
        <Text style={styles.Head}>World Statistics</Text>
        <Text style={styles.text}>Total Population:</Text>
      <Text style={[styles.text2,{fontSize:35}]}>{population}</Text>
      {data!==undefined?dataView:<ActivityIndicator size="large" color="#104691" />}
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      paddingTop:"30%",
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