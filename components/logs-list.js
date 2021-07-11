import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native'
import color from '@assets/color'
import StatusCode from '@components/status-code'

const LogsList = ({ logs, setSelectedLog }) => {
  return (
    <ScrollView style={[styles.listHeight, styles.container]}>
      {logs.map((log, key) => {
        return (
          <Pressable onPress={() => setSelectedLog(key)} key={key}>
            <View style={styles.row}>
              <Text style={[styles.text, styles.thickColumn]}>
                {log.hostname}
              </Text>
              <Text style={[styles.text, styles.thinColumn]}>
                {log.request_method}
              </Text>
              <StatusCode
                style={[styles.text, styles.thickColumn]}
                code={log.request_status}
              />
              <Text style={[styles.text, styles.thickColumn]}>
                {log.request_referer}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.primary,
    maxHeight: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    color: color['text-light'],
  },
  thickColumn: {
    width: '30%',
  },
  thinColumn: {
    width: '10%',
  },
})

export default LogsList
