import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Button } from 'react-native';
import {WorldScreen} from './World'
import {CountryScreen} from './Country'
import {FavouriteScreen} from './Favourite'
import {SelCountryScreen} from './SelCountryScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer ,DefaultTheme,DarkTheme} from '@react-navigation/native';


function CountryNav() {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{
            headerStyle: {
              backgroundColor: '#104691',
            },
            headerTintColor: '#EFC9A4',
          }}
             name="Country" component={CountryScreen} />
        <Stack.Screen options={{
            headerStyle: {
              backgroundColor: '#104691',
            },
            headerTintColor: '#EFC9A4',
          }} name="Selective" component={SelCountryScreen} />
      </Stack.Navigator>
 
  );
}
function FavouriteNav() {
  return (
      <Stack.Navigator>
        <Stack.Screen  options={{
            headerStyle: {
              backgroundColor: '#104691',
            },
            headerTintColor: '#EFC9A4',
          }}name="Favourite" component={FavouriteScreen} />
        <Stack.Screen options={{
            headerStyle: {
              backgroundColor: '#104691',
            },
            headerTintColor: '#EFC9A4',
          }} name="Selective" component={SelCountryScreen} />
      </Stack.Navigator>
 
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      
      <Drawer.Navigator drawerContentOptions={{
      activeTintColor: '#104691',
      activeBackgroundColor:"#EFC9A4",
      inactiveTintColor: '#EFC9A4',
      backgroundColor:"#104691",
      itemStyle: { marginVertical: 5 },
      
    }}  initialRouteName="World">
        <Drawer.Screen name="World" component={WorldScreen} />
        <Drawer.Screen name="CountryNav" component={CountryNav}/>
        <Drawer.Screen name="FavouriteNav" component={FavouriteNav} />
        
      </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Head:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    color:'#1F9DE7'
  },
});
