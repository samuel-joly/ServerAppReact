import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native'
import color from '@assets/color'
import font from '@assets/font'
import LogsDetails from '@components/logs-details'
import LogsList from '@components/logs-list'
import axios from 'axios'
import Constants from 'expo-constants'
import {UserContext} from '../UserContext'

const LogsMain = ({ navigation }) => {
  const {state} = React.useContext(UserContext);
  const [selectedLog, setSelectedLog] = useState(null)
  const [logs, setLogs] = useState(null)

  useEffect(() => {
    async function getLogs() {
      return await axios({
        method:"get",
        url:"log",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+state.token
        }
      })
    }
    getLogs().then((response) => {
      console.log(response.data.data)
        setLogs(response.data)
      })
      .catch((error) => error)
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
        navigation.navigate('manageSite')
      },
    },
    log: {
      details() {
        console.log('cc')
      },
    },
  }

  return (
    <View
      style={[
        styles.container,
        {
          height: Dimensions.get('window').height,
          maxHeight: Dimensions.get('window').height,
        },
      ]}
    >
      {logs ? (
        <LogsList logs={logs} setSelectedLog={setSelectedLog} />
      ) : (
        <Text>Loading</Text>
      )}
      {selectedLog ? <LogsDetails log={logs[selectedLog]} /> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // button: {
  //   height: 50,
  //   width: 300,
  //   borderRadius: 4,
  //   backgroundColor: color.ternary,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 25,
  // },
  // buttonText: {
  //   fontSize: 24,
  //   color: color['text-dark'],
  //   fontFamily: font.main,
  // },
})

export default LogsMain
