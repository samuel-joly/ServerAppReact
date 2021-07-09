import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

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
const App = () => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Auth} />
        <Stack.Screen name="navigate" component={Navigate} />
        <Stack.Screen name="logs" component={Logs} />
        <Stack.Screen name="manage site" component={ManageSite} />
        <Stack.Screen name="performance" component={Performance} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

export default App
