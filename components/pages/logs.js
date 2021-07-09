import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import color from '../../assets/color'
import font from '../../assets/font'
import LogDetails from '../shared/log-details'
import LogsList from '../shared/logs-list'
import axios from 'axios'
import Constants from 'expo-constants'

const Logs = ({ navigation }) => {
  const fakeDatas = [
    {
      ip: '127.0.0.1',
      method: 'GET',
      responseCode: '200',
      endpoint: 'www.samueljoly.xyz/hosts',
      headers: [
        {
          name: 'Accept',
          value: 'image/webp,*/*',
        },
        {
          name: 'Accept-Encoding',
          value: 'gzip, deflate, br',
        },
        {
          name: 'Accept-Language',
          value: 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
        },
        {
          name: 'Alt-Used',
          value: 'reactnative.dev',
        },
        {
          name: 'Cache-Control',
          value: 'max-age=0',
        },
        {
          name: 'Connection',
          value: 'keep-alive',
        },
        {
          name: 'Host',
          value: 'reactnative.dev',
        },
        {
          name: 'If-None-Match',
          value: 'W/"a74c15534a55abd323a9858604eb34c7-ssl"',
        },
        {
          name: 'Referer',
          value: 'https://reactnative.dev/docs/navigation',
        },
        {
          name: 'TE',
          value: 'Trailers',
        },
        {
          name: 'User-Agent',
          value:
            'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
        },
      ],
    },
    {
      ip: '127.0.0.1',
      method: 'GET',
      responseCode: '500',
      endpoint: 'www.samueljoly.xyz/hosts',
    },
    {
      ip: '127.0.0.1',
      method: 'GET',
      responseCode: '303',
      endpoint: 'www.samueljoly.xyz/hosts',
    },
    {
      ip: '127.0.0.1',
      method: 'UPDATE',
      responseCode: '404',
      endpoint: 'www.samueljoly.xyz/hosts',
    },
  ]
  const [logs, setLogs] = useState(null)

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
    <View style={styles.container}>
      {logs ? <LogsList logs={logs} /> : <Text>Loading</Text>}
      <LogDetails log={fakeDatas[0]} />
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
  test: {
    height: '40%',
  },
})

export default Logs
