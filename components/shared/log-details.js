import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import color from '../../assets/color'
import font from '../../assets/font'
import StatusCode from './status-code'

const LogDetails = ({ navigation, log }) => {
  const behaviors = {}

  return (
    <View style={styles.container}>
      <View style={styles.textLight}>
        <View style={[styles.textLight, styles.head]}>
          <Text style={styles.textLight}>{log.ip}</Text>
          <Text style={styles.textLight}>{log.method}</Text>
        </View>
        <View style={[styles.textLight, styles.head]}>
          <Text style={styles.textLight}>{log.endpoint}</Text>
          <StatusCode code={log.responseCode} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.textLight}>Request Header</Text>
        {log.headers.map((header, key) => {
          return (
            <Text style={styles.headersList} key={key}>
              <Text style={styles.headerName}>{header.name}: </Text>
              <Text style={styles.headerValue}>{header.value}</Text>
            </Text>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: color['primary-darker-1'],
    paddingTop: 10,
  },
  textLight: {
    color: color['text-light'],
  },
  head: {
    textAlign: 'justify',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  headersList: {
    backgroundColor: color['primary-darker-2'],
  },
  headerName: {
    color: color['text-muted'],
  },
  headerValue: {
    color: color['text-light'],
  },
})

export default LogDetails
