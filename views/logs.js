import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, Dimensions, View, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import LogMain from '@components/logs-main'

const Logs = ({ navigation }) => {
  const renderRightActions = (progress, dragX) => {
    return (
      <View>
        <Text style={styles.leftAction}>cc</Text>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <LogMain />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  leftAction: {
    width: Dimensions.get('window').width * 0.7,
  },
})

export default Logs
