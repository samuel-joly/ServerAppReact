import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import color from '../../assets/color'
import StatusCode from './status-code'

const LogsList = ({ logs }) => {
  return (
    <View style={styles.container}>
      {logs.map((log, key) => {
        console.log(log)
        return (
          <View style={styles.row} key={key}>
            <Text style={styles.text}>{log.ip}</Text>
            <Text style={styles.text}>{log.method}</Text>
            <StatusCode code={log.responseCode} />
            <Text style={styles.text}>{log.endpoint}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  row: {
    // flex: 1,
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: color['text-light'],
  },
})

export default LogsList
