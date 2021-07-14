import React, {useContext, useState} from 'react'
import { ActivityIndicator, View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import {UserContext} from '../UserContext'
import color from '../assets/color'
import font from '../assets/font'

const Auth = ({ navigation }) => {
  const {signIn} = React.useContext(UserContext);
  const [email, setEmail] = React.useState("administrator");
  const [password, setPassword] = React.useState('administrator');
  const [signingin, setSigningin] = React.useState(false);
  const [userError, setUsernameError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  return (
    <View style={styles.container}>
      {!signingin ? (
        <>
          {userError ? <Text style={[{color:"#ff0000"}]}>{userError}</Text> : null}
          <View style={styles.formControl}>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.textInput} onChangeText={setEmail}></TextInput>
          </View>

          {passwordError ? <Text style={[{color:"#ff0000"}]}>{passwordError}</Text> : null}
          <View style={styles.formControl}>
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.textInput} onChangeText={setPassword}></TextInput>
          </View>

          <Pressable
            onPress={
              async () => {
                setSigningin(true);
                try {
                  await signIn(email, password);
                  setSigningin(false);
                  navigation.navigate('navigate');
                } catch (e){
                  setUsernameError(e.response.data.messages.errors[0]?.username);
                  setPasswordError(e.response.data.messages.errors[0]?.password);
                  setSigningin(false);
                }
              }
            }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </Pressable>
        </>
      ) : (
        <ActivityIndicator size='large' color="#ffffff"/>
      )}
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
