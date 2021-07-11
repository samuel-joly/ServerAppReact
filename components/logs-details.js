import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import color from '@assets/color'
import font from '@assets/font'
import RequestHeaders from '@components/request-headers'
import StatusCode from '@components/status-code'

const LogsDetails = ({ navigation, log, logType }) => {
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
      <View style={[styles.textLight, styles.head]}>
        <View style={[styles.textLight, styles.row]}>
          <Text style={styles.textLight}>{log.hostname}</Text>
          <Text style={styles.textLight}>{log.request_method}</Text>
        </View>
        <View style={[styles.textLight, styles.row]}>
          <Text style={styles.textLight}>{log.request_referer}</Text>
          <StatusCode code={log.request_status} />
        </View>
      </View>
      <View style={styles.body}>
        <RequestHeaders log={log} headerType="Request" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color['primary-darker-1'],
    paddingTop: 10,
    height: '45%',
    maxHeight: '45%',
  },
  head: {
    height: '20%',
    maxHeight: '20%',
  },
  body: {
    height: '80%',
    maxHeight: '80%',
  },
  textLight: {
    color: color['text-light'],
  },
  row: {
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

export default LogsDetails
