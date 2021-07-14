import React, {useEffect, useContext} from 'react'
import {UserContext} from '../UserContext'
import { Dimensions, View, StyleSheet, Text, Pressable } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import color from '@assets/color'
import font from '@assets/font'


const ManageSite = ({ navigation }) => {
  const [services, setServices] = React.useState([]);
  const [refresher, setRefresher] = React.useState(false);
  const {state} = useContext(UserContext);

  useEffect(() => {
    async function getServiceDatabase(token) {
      if(token == null) {
        throw "No token givent"
      }
      return await axios.get(
        '/database',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ token
          },
        });
    }

    try {
      getServiceDatabase(state.token).then((service) => {
        setServices(service.data.database);
      })
    } catch (e) {
      console.log(e)
    }
  }, [])


  return (
    <View
      style={[
        styles.main,
        {
          height: Dimensions.get('window').height,
          maxHeight: Dimensions.get('window').height,
        },
      ]}
    >
      <View style={styles.container}>
        { services.map((value, key) =>  {
          return (
            <View style={styles.service}key={key} >
              <Text style={styles.serviceName}>{value.database_name}</Text>
              <Pressable style={styles.databaseBtn} onPress={() => navigation.navigate('service database', {database : value.database_name})} >
            <Text style={styles.databaseName}>Database</Text>
              </Pressable>
            </View>
          )
        }) }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main :{
    width: '100%',
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container:{
    flexDirection:"column",
    padding:5,
    justifyContent:"flex-start",
    alignItems:"center"
  },
  service :{
    backgroundColor:color.secondary,
    padding:4,
    marginBottom:4,
    borderRadius:4,
    width: Dimensions.get('window').width * 0.9
  },
  serviceName:{
    color:color['text-light'],
    fontSize: 22
  },
  databaseBtn: {
    backgroundColor:color.ternary,
    borderRadius:4,
    width: 80,
    marginTop:5
  },
  databaseName:{
    color:color['text-dark'],
    fontSize:15,
    textAlign:"center",

  }
})

export default ManageSite
