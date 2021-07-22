import React from 'react'
import {UserContext} from '../UserContext'
import {ScrollView, ActivityIndicator, Dimensions, View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { DataTable } from 'react-native-paper';
import DataTableCustom from '@components/datatablecustom'
import axios from 'axios'
import color from '@assets/color'
import font from '@assets/font'


const ServiceDatabase = ({route, navigation}) => {
  const {database} = route.params;
  const {state} = React.useContext(UserContext);
  const [tables, setTables] = React.useState(null);
  const [tableInfo, setTableInfo] = React.useState(null);
  const [selectedTable, setSelectedTable] = React.useState(null)
  const [showData, setShowData] = React.useState(false)
  const [tableContent, setTableContent] = React.useState(null)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "tables of "+database
    })
  }, [navigation])
  React.useEffect(() => {
    async function getDatabasesInfos(token) {
      try {
        return await axios(
          {
            method:"get",
            url:"/database/tables",
            params : {
              "database": database
            },
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer " + token
            }
          }
        )
      } catch (e) {
        console.log(e)
      }
    }

    getDatabasesInfos(state.token).then((data) => {
      setTables(data.data.tables)
    }
                                       )
  }, [])

  async function getTableInfo(token, database, tableInfo) {
    try {
      await axios({
        method:"get",
        url:"/database/describe",
        params:{
          "database":database,
          "table":tableInfo
        },
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ token
        }
      }).then((data) =>{
        setTableInfo(data.data.table)
        setTableContent(null)
        setSelectedTable(tableInfo)
        setShowData(false)
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  async function getTableData(token, database, table) {
    try {
      axios({
        "url":"/database/table/content",
        method:"get",
        params:{
          database: database,
          table: selectedTable
        },
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer "+ token
        }
      }).then((data) => {
        setTableContent(data.data.table)
        setShowData(true)
      })
    } catch(e) {
      console.log(e)
    }
    console.log(token, database, table)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        {tables != null ?
         (tables.map((value, key) => {
           return (
             <View key={key}>
               <TouchableOpacity onPress={() => getTableInfo(state.token, database, value)} style={styles.table}>
                 <Text style={styles.tableName}>{value}</Text>
               </TouchableOpacity>
             </View>
           )})) : <ActivityIndicator/>
        }
      </View>
      {tableInfo != null ? (
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
          {
            tableContent != null ? (
              <>
                <TouchableOpacity onPress={() => getTableInfo(state.token, database, selectedTable)} style={styles.databaseData}>
                  <Text style={{textAlign:"center", fontSize:20, color:color['text-light']}}>Show Description</Text>
                </TouchableOpacity>
                <DataTableCustom data={tableContent}/>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={() => getTableData(state.token, database, selectedTable)} style={styles.databaseData}>
                  <Text style={{textAlign:"center", fontSize:20, color:color['text-light']}}>Show Data</Text>
                </TouchableOpacity>
                <DataTableCustom data={tableInfo}/>
              </>
            )
          }
        </View>
      ) : <ActivityIndicator/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:"column",
  },
  databaseData:{
    fontSize:20,
    textAlign:"center",
    width: Dimensions.get('window').width * 0.9,
    borderRadius:4,
    backgroundColor:color.ternary,
    height:30,
    marginBottom:4
  },
  tableContainer:{
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    flexWrap:"wrap",
    marginBottom:5
  },
  table:{
    backgroundColor:color.secondary,
    padding: 4,
    borderRadius:4,
    margin:4,
  },
  tableName:{
    color:color['text-light'],
    fontSize:18
  },
})

export default ServiceDatabase;
