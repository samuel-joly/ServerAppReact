import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import color from '@assets/color'
import font from '@assets/font'
import {UserContext} from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RESTOK} from '../type'

const Navigate = ({ navigation }) => {
  const {state, setToken} = React.useContext(UserContext);

 React.useEffect(() => {
   async function setTok() {
     await setToken()
   }
   setTok();
 }, [])

  const behaviors = {
    navigate: {
      logs() {
        navigation.navigate('logs')
      },
      performance() {
        navigation.navigate('performance')
      },
      manageSite() {
        navigation.navigate('manage site')
      },
    },
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={behaviors.navigate.logs}>
        <View style={styles.button}>
    <Text style={styles.buttonText}>Show logs</Text>
        </View>
      </Pressable>

      <Pressable onPress={behaviors.navigate.performance}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Performance</Text>
        </View>
      </Pressable>

      <Pressable onPress={behaviors.navigate.manageSite}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Manage website</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 300,
    borderRadius: 4,
    backgroundColor: color.ternary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 24,
    color: color['text-dark'],
    fontFamily: font.main,
  },
})

export default Navigate
