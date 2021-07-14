import React from 'react'
import {UserContext} from '../UserContext'
import {ScrollView, ActivityIndicator, Dimensions, View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { DataTable } from 'react-native-paper';
import axios from 'axios'
import color from '@assets/color'
import font from '@assets/font'


const ServiceDatabase = ({route, navigation}) => {
  const {database} = route.params;
  const {state} = React.useContext(UserContext);
  const [tables, setTables] = React.useState(null);
  const [tableInfo, setTableInfo] = React.useState(null);

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
      })
    } catch (e) {
      console.log(e.message);
    }
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
        <View style={{flex:1}}>
          <ScrollView style={styles.tableInfos}>
            <DataTable style={styles.dataTable}>
              <DataTable.Header>
                {tableInfo != null ?
                 Object.keys(tableInfo[0]).map((column, key) => {
                   if(column != "nullable" && column != "default" && column != "primary_key"){
                    return (
                        <DataTable.Title style={styles.header} key={key+1}>{column}</DataTable.Title>
                    )

                   }
                 })
                 : <ActivityIndicator/>}
              </DataTable.Header>
              {tableInfo != null ?
               tableInfo.map((table, key) => {
                 return (
                   <DataTable.Row key={key}>
                     {
                       Object.values(table).map((value, key) => {
                         if(key != 3 && key != 4 && key != 5) {
                            return (
                              <DataTable.Cell style={{justifyContent:"center"}} key={key}>{value != null ?  value : "-"}</DataTable.Cell>
                            )

                         }
                       })

                     }
                   </DataTable.Row>
                 )
               })
               : <ActivityIndicator/>}
            </DataTable>
          </ScrollView>
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
  tableInfos:{
    backgroundColor:color.tertiary,
  },
  dataTable:{
    width: Dimensions.get('window').width * 0.9,
    backgroundColor:color.secondary,
  },
  header: {
    fontSize:15,
    justifyContent:"center"
  }
})

export default ServiceDatabase;
