import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native'
import color from '../../assets/color'
import font from '../../assets/font'
import LogDetails from '../shared/log-details'
import LogsList from '../shared/logs-list'
import axios from 'axios'
import Constants from 'expo-constants'
import { useHeaderHeight } from '@react-navigation/stack'

const Logs = ({ navigation }) => {
  const [logs, setLogs] = useState(null)
  const [selectedLog, setSelectedLog] = useState(null)
  const headerHeight = useHeaderHeight()

  useEffect(() => {
    const backendUrl = Constants.manifest.extra.backendUrl
    axios
      .get(`${backendUrl}/log`)
      .then((response) => {
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
          height: Dimensions.get('window').height - headerHeight,
          maxHeight: Dimensions.get('window').height - headerHeight,
        },
      ]}
    >
      {logs ? (
        <LogsList logs={logs} setSelectedLog={setSelectedLog} />
      ) : (
        <Text>Loading</Text>
      )}

      {selectedLog ? <LogDetails log={logs[selectedLog]} /> : <></>}
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

export default Logs
