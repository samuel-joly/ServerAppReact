import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, Dimensions, View, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import LogsMain from '@components/logs-main'
import LogsFilter from '../components/logs-filter'

const Logs = ({ navigation }) => {
  const renderFilterPanel = (progress, dragX) => {
    return <LogsFilter />
  }

  return (
    <Swipeable renderRightActions={renderFilterPanel}>
      <LogsMain />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  leftAction: {
    width: Dimensions.get('window').width * 0.7,
  },
})

export default Logs
