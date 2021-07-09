import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import color from '../../assets/color'
import font from '../../assets/font'
import RequestHeaders from './request-headers'
import StatusCode from './status-code'

const LogDetails = ({ navigation, log, logType }) => {
  const [isDropedDown, setIsDropedDown] = useState(null)

  const behaviors = {
    dropdown() {
      if (isDropedDown) {
        setIsDropedDown(false)
      } else {
        setIsDropedDown(true)
      }
    },
  }

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
        <RequestHeaders header={log.headers} headerType="Request" />
        <RequestHeaders header={log.headers} headerType="Response" />
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
