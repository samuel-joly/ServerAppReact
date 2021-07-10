import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native'
import color from '../../assets/color'
import font from '../../assets/font'
import LogMain from '../shared/log-main'
import axios from 'axios'
import Constants from 'expo-constants'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LogFilter from '../shared/log-filter'
import SideMenuParentScreen from '../shared/SideMenuParentScreen'

const Logs = ({ navigation }) => {
  const behaviors = {}

  const Drawer = createDrawerNavigator()
  return (
    // <SideMenuParentScreen />
    <Drawer.Navigator drawerPosition="right" drawerType="front">
      <Drawer.Screen name="logMain" component={LogMain} />
      <Drawer.Screen name="logFilter" component={LogFilter} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})

export default Logs
