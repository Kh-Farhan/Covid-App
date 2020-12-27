import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Button,FlatList ,ActivityIndicator} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
export function CountryScreen({ navigation }) {
  const [countries,setCountries]=useState([]);
  const [counTemp,setCounTemp]=useState([]);
  const [search,setSearch]=useState("");
  useEffect(()=>{
    fetch("https://world-population.p.rapidapi.com/allcountriesname", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fd53eefed3msh026b9ba68a91498p19918fjsndd7a94aad9c7",
        "x-rapidapi-host": "world-population.p.rapidapi.com"
      }
    })
    .then((response) => response.json())
        .then((responseJson) => {
          const at=responseJson.body.countries.filter(item=>item!=="DR Congo");
          setCountries(at);
          setCounTemp(at);
          
        })
    .catch(err => {
      console.error(err);
    });
  },[]);
  const searchT=()=>{
    const filteredcountries = counTemp.filter(word=>word===search);
    setCounTemp(filteredcountries);
  }
  useEffect(()=>{
    if(search.length===0){
      setCounTemp(countries);
    }
  },[search])
  




  const view=<View style={styles.list}>
    {<FlatList 
          keyExtractor={(item, index) => 'key'+index}
          data={counTemp}
          renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Selective",{name:item})
          }} style={styles.countries}><Text style={styles.countriesT}>{item}</Text></TouchableOpacity>
        )}
      />}
  </View>
    return (
      <View style={styles.container}>
        <Text style={styles.Head}>Countries</Text>
        <View style={{flexDirection:"row"}}>
        <SearchBar
        inputContainerStyle={{backgroundColor:"#EFC9A4",borderBottomWidth:1,borderBottomColor:"#1F8AC0"}}
        containerStyle={styles.search}
        placeholder="Search by name ..."
        onChangeText={text=>{setSearch(text);
        }}
        value={search}
      />
      <EvilIcons style={{paddingTop:8}} onPress={searchT}name="search" size={56} color="#1F8AC0" />
      </View>
      
        {counTemp.length!==0?view:<ActivityIndicator size="large" color="#104691" />}
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
      padding:"4%",
      borderBottomWidth:1,
      borderBottomColor:"#1F8AC0",
      paddingLeft:"6%",
      height:50,
    },
    countriesT:{
      textAlign:"center",
      color:"#104691",
      fontSize:16
    },
    search:{
      backgroundColor: '#EFC9A4', borderRadius: 10,width:"80%",marginBottom:20,
      borderColor:'#EFC9A4',borderBottomWidth:0,borderTopWidth:0
    }
  });