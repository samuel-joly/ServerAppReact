import React from 'react'
import {ScrollView, ActivityIndicator, Dimensions, View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import color from '@assets/color'
import font from '@assets/font'


const DataTableCustom = (data) => {
  const table = data.data;
  const header = Object.keys(table[0])
  let rows = [];
  let widthArray = []
  table.map((el) => {
    rows.push((Object.values(el) != null) ? Object.values(el) : "-")
    widthArray.push(100);
  })

  return (
    <ScrollView style={{maxWidth:Dimensions.get('window').width*0.9}} horizontal={true}>
        <Table style={styles.container} borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <ScrollView >
            <Row data={header} widthArr={widthArray} borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}} textStyle={styles.headerText} style={styles.header}></Row>
            <Rows data={rows}  widthArr={widthArray} borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}} style={styles.rows} textStyle={styles.rowsText}></Rows>
          </ScrollView>
        </Table>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    height:40,
  },
  headerText:{
    color:color['text-light'],
    fontSize:15,
    textAlign:"center"
  },
  rows:{
    height:80,
    overflow:"hidden",
  },
  rowsText:{
    color:color['text-muted'],
    textAlign:"center",
  }
})

export default DataTableCustom;
