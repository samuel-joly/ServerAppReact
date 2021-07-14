import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, Text }from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer'
import color from './assets/color'
import {Logs, Auth, Navigate, ManageSite, Performance, ServiceDatabase} from 'views/'
import { UserContext } from "./UserContext";
import { UserState } from "./UserState";
import {useFonts, arvo} from '@expo-google-fonts/arvo'

import axios from "axios";

axios.defaults.baseURL = "http://82.66.65.201:5555";
//axios.defaults.baseURL = "http://ServerApp.local";
axios.defaults.timeout = 3000;

const navigatorTheme = {
  dark: true,
  colors: {
    primary: color['text-light'],
    background: 'rgb(242, 242, 242)',
    card: color.primary,
    text: color['text-light'],
    border: color.primary,
    notification: 'rgb(255, 69, 58)',
  },
}
const Drawer = createDrawerNavigator()

const App = () => {
  const [logged, setLogged] = React.useState(false);

  useFonts({arvo});

  useEffect(() => {
    setLogged( async () => {
      try {
        const token = JSON.parse(await AsyncStorage.getItem('user')).token;
        setLogged(token != null ? true : false);
        UserState.setToken();
      } catch(e) {
        // error reading value
      }
    });
  }, []);

  return (
    <UserState>
      <UserContext.Consumer>
        {(state) => {
          return (
            <NavigationContainer theme={navigatorTheme}>
              <Drawer.Navigator>
                {logged != true ? (<Drawer.Screen name="login" component={Auth} />) : null }
                <Drawer.Screen name="navigate" component={Navigate} />
                <Drawer.Screen name="service database" component={ServiceDatabase} />
                <Drawer.Screen name="logs" component={Logs} />
                <Drawer.Screen name="manage site" component={ManageSite} />
                <Drawer.Screen name="performance" component={Performance} />
              </Drawer.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          )
        }}
      </UserContext.Consumer>
    </UserState>
  )
}

export default App
