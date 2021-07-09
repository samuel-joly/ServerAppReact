import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import color from '../../assets/color'
import { AntDesign } from '@expo/vector-icons'

const RequestHeaders = ({ header, headerType }) => {
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
    <View>
      <Pressable style={styles.headerRow} onPress={behaviors.dropdown}>
        <Text style={styles.textLight}>{headerType} header</Text>
        <AntDesign name="caretdown" size={15} color={color['text-light']} />
      </Pressable>
      {isDropedDown ? (
        <ScrollView>
          {header.map((header, key) => {
            return (
              <Text style={styles.headersList} key={key}>
                <Text style={styles.headerName}>{header.name}: </Text>
                <Text style={styles.headerValue}>{header.value}</Text>
              </Text>
            )
          })}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
