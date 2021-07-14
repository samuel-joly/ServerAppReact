import React from 'react'
import {UserContext} from '../UserContext'
import {Dimensions, View, StyleSheet, Text, Pressable} from 'react-native'
import axios from 'axios'
import color from '@assets/color'
import font from '@assets/font'


const ServiceDatabase = ({route, navigation}) => {
  const {database} = route.params;
  console.log(database);


  return (
    <View style={styles.container}>
      <Text>{database}</Text>
    </View>

  )

}

const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ServiceDatabase;
