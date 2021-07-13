import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import color from '@assets/color'

const RequestHeaders = ({ log, headerType }) => {
  const [isDropedDown, setIsDropedDown] = useState(null)
  const [headersLabels, setHeadersLabels] = useState({
    request_accept: 'Accept',
    response_encoding: 'Accept-Encoding',
    request_language: 'Accept-Language',
    response_keep_alive: 'Connection',
    hostname: 'Host',
    request_referer: 'Referer',
    user_agent: 'User-Agent',
  })

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
      <Pressable style={styles.headerRow} onPress={behaviors.dropdown}>
        <Text style={styles.textLight}>{headerType} header</Text>
        <AntDesign name="caretdown" size={15} color={color['text-light']} />
      </Pressable>
      {isDropedDown ? (
        <ScrollView style={styles.headerList}>
          {Object.keys(headersLabels).map((dbLabel, key) => (
            <Text style={styles.headersList} key={key}>
              <Text style={styles.headerName}>{headersLabels[dbLabel]}: </Text>
              <Text style={styles.headerValue}>{log[dbLabel]}</Text>
            </Text>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerList: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLight: {
    color: color['text-light'],
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

export default RequestHeaders
