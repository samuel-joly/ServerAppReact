import React from 'react'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import color from '@assets/color'
import font from '@assets/font'

const Auth = ({ navigation }) => {
  const behaviors = {
    login() {
      navigation.navigate('navigate')
    },
  }
  return (
    <View style={styles.container}>
      <View style={styles.formControl}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>

      <View style={styles.formControl}>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>

      <Pressable onPress={behaviors.login}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
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
  text: {
    color: color['text-light'],
    fontSize: 20,
    fontFamily: font.main,
  },
  textInput: {
    backgroundColor: color.ternary,
    borderRadius: 4,
    height: 40,
    width: 300,
  },
  button: {
    height: 40,
    width: 300,
    borderRadius: 4,
    backgroundColor: color.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: color['text-dark'],
    fontFamily: font.main,
  },
  formControl: {
    marginBottom: 20,
  },
})

export default Auth
