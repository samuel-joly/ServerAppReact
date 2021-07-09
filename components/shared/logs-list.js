import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import color from '../../assets/color'
import StatusCode from './status-code'

const LogsList = ({ logs }) => {
  return (
    <ScrollView style={styles.listHeight}>
      <View style={styles.container}>
        {logs.map((log, key) => {
          return (
            <View style={styles.row} key={key}>
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
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },

  listHeight: {
    height: 20,
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
