import React from 'react'
import { StyleSheet, Animated, Dimensions, View, Text } from 'react-native'
import color from '@assets/color'
import { Foundation } from '@expo/vector-icons'

const h1TitleSize = 42

const LogsFilter = () => {
  return (
    <View style={styles.container}>
      <Text>
        <Foundation
          name="filter"
          size={h1TitleSize}
          color={color['text-light']}
        />
        <Text style={[styles.h1Title, styles['text-light']]}>Filter</Text>
      </Text>
      <View>
        <Text style={[styles.h2Title, styles['text-light']]}>WebApp</Text>
      </View>
      <View>
        <Text style={[styles.h2Title, styles['text-light']]}>Response</Text>
      </View>
      <View>
        <Text style={[styles.h2Title, styles['text-light']]}>Client</Text>
      </View>
      <View>
        <Text style={[styles.h2Title, styles['text-light']]}>IP filter</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: color.secondary,
    padding: 5,
  },
  'text-light': {
    color: color['text-light'],
  },
  h1Title: {
    fontSize: h1TitleSize - 10,
  },
  h2Title: {
    fontSize: h1TitleSize - 20,
  },
})

export default LogsFilter
