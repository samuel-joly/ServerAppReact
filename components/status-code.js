import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import color from '@assets/color'

const StatusCode = ({ code }) => {
  const behaviors = {}

  const bgColor = calculColor(code)
  return (
    <View style={[styles.container, styles[bgColor]]}>
      <Text style={styles.text}>{code}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 2,
  },

  text: {
    color: color['text-light'],
  },

  bgInfo: {
    backgroundColor: color.info,
  },
  bgSuccess: {
    backgroundColor: color.success,
  },
  bgWarning: {
    backgroundColor: color.warning,
  },
  bgDanger: {
    backgroundColor: color.danger,
  },
})

function calculColor(code) {
  const intCode = parseInt(code)

  if (intCode >= 100 && intCode < 200) {
    return 'bgInfo'
  } else if (intCode >= 200 && intCode < 300) {
    return 'bgSuccess'
  } else if (intCode >= 300 && intCode < 400) {
    return 'bgWarning'
  } else if (intCode >= 400 && intCode < 500) {
    return 'bgInfo'
  } else if (intCode >= 500 && intCode < 600) {
    return 'bgDanger'
  } else {
    return 'bgInfo'
  }
}

export default StatusCode
