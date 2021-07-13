import React, {useEffect} from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import color from '../../assets/color'
import font from '../../assets/font'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function getServiceDatabase(token=null) {
  return await axios.get('/database',
                         {
                           headers: {
                             'Content-Type': 'application/json',
                             Authorization: 'Bearer'+ token ? token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJleHAiOjE2Mjg3MDcyNzd9.0rEldusQS_K71m9ycUMN4z2vNZnO9HYymXBcuy4_ins'
                           },
                         });
}
async function getToken() {
  return JSON.parse(await AsyncStorage.getItem('user')).token;
}


const ManageSite = ({ navigation }) => {
  const [services, setServices] = React.useState([]);
  const [refresher, setRefresher] = React.useState(false);

  useEffect(() => {
    try {
      const token = getToken();
      getServiceDatabase(token).then((data) => setServices(data.data.database));
    } catch (e) {
      console.log(e)
    }

  }, [])

  const behaviors = {
    navigate: {
      logs() {
        navigation.navigate('logs')
      },
      performance() {
        navigation.navigate('performance')
      },
      manageSite() {
        navigation.navigate('manageSite')
      },
    },
  }

  return (
    <View style={styles.container}>
      { services.map((value, key) =>  {
        return (
          <View key={key} style={styles.services}>
            <Text style={styles.individual_service}>{value.database_name}</Text>
            <Pressable onPress={() => navigation.navigate('Service-Database')} style={styles.databases}>
              <Text style={styles.database_service}>Database</Text>
            </Pressable>
          </View>
        )
      }) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:'20px'
  },
  services:{
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width : '100%',
    borderRadius: 4,
    maxHeight: '55px',
    backgroundColor: color['primary-darker-1'],
    padding: '10px',
  },
  individual_service:{
    fontSize: 30,
    color: 'white',
    marginRight:'20px',
  },
  database:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  database_service: {
    padding:'4px',
    fontSize: 20,
    color: 'white',
    marginRight:'20px',
    borderRadius: 4,
    backgroundColor:color['primary-darker-2']
  },
  button: {
    height: 50,
    width: 300,
    borderRadius: 4,
    backgroundColor: color.ternary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 24,
    color: color['text-dark'],
    fontFamily: font.main,
  },
})

export default ManageSite
