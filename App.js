import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import color from './assets/color'

import Logs from './components/pages/logs'
import Auth from './components/pages/auth'
import Navigate from './components/pages/navigate'
import ManageSite from './components/pages/manage-site'
import Performance from './components/pages/performance'

const Stack = createStackNavigator()
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
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Drawer.Navigator>
        <Drawer.Screen name="login" component={Auth} />
        <Drawer.Screen name="navigate" component={Navigate} />
        <Drawer.Screen name="logs" component={Logs} />
        <Drawer.Screen name="manage site" component={ManageSite} />
        <Drawer.Screen name="performance" component={Performance} />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

export default App
