import React from 'react'
import { Dimensions,View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import color from '@assets/color'
import font from '@assets/font'
import {LineChart, BarChart} from 'react-native-chart-kit';
import axios from 'axios';
import {UserContext} from '../UserContext'

const Performance = ({ navigation }) => {

  const {state} = React.useContext(UserContext);
  const [visit, setVisit] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [FirefoxVisit, setFirefoxVisit] = React.useState(0);
  const [ChromeVisit, setChromeVisit] = React.useState(0);
  const [EdgeVisit, setEdgeVisit] = React.useState(0);
  const [SafariVisit, setSafariVisit] = React.useState(0);
  const [services, setService] = React.useState("visit");

  React.useEffect(()=>{
    async function logs() {
      return await axios({
        "method":"get",
        "url":"log/stat",
        "params" : {
          "type":services,
          "service":"portfolio_log"
        },
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+state.token
        }
      })
    }

    async function useragent(browser) {
      return await axios({
        "method":"get",
        "url":"log/stat/useragent",
        "params":{
          "service":"portfolio_log",
          "browser": browser
        },
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+state.token
        }
      })
    }

    try {
      logs().then((data) => {setVisit(data.data.data);})
      useragent("Firefox").then((data) => {setFirefoxVisit(data.data.data[0]["count(user_agent)"])})
      useragent("Chrome").then((data) => {setChromeVisit( data.data.data[0]["count(user_agent)"])})
      useragent("Safari").then((data) => {setSafariVisit( data.data.data[0]["count(user_agent)"])})
      useragent("Edge").then((data) => {setEdgeVisit(data.data.data[0]["count(user_agent)"])})

    } catch (e) {
      console.log(e, service)
    }
  }, [services])

  return (
    <View style={styles.topContainer}>
      <View style={{flex:1, justifyContent:"center", flexDirection:"row", maxHeight:40}}>
        <Pressable style={styles.serviceBtn} onPress={() => {setService('visit')}}>
          <Text style={{color:'#ffffff'}}>Visites</Text>
        </Pressable>
        <Pressable style={styles.serviceBtn} onPress={() => {setService('error')}}>
          <Text style={{color:'#ffffff'}}>Erreures</Text>
        </Pressable>
      </View>
      <ScrollView style={{flex:1,heigh:10}} horizontal={true}>
        <View style={styles.container}>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
              datasets: [
                {
                  data:visit
                }
              ]
            }}
            width={Dimensions.get("window").width*1.9} // from react-native
            height={220}
            yAxisLabel="#"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor:color.primary,
              backgroundGradientFrom:color.primary,
              backgroundGradientTo:color.secondary,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke:color.ternary
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      </ScrollView>

    <View style={styles.container}>
      <Text style={{fontSize:25, color:'#ffffff', textAlign:"center"}}>Browser visit</Text>
        <BarChart
          data={{labels:["Firefox", "Chrome", "Safari", "Edge"], datasets: [{data : [FirefoxVisit, ChromeVisit, SafariVisit, EdgeVisit]}]}}
          width={Dimensions.get("window").width * 0.97 }
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor:color.ternary,
            backgroundGradientFrom: color.primary,
            backgroundGradientTo: color.secondary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  serviceBtn:{
    marginRight:5,
    backgroundColor:color.ternary,
    borderRadius:4,
    maxHeight:33,
    padding:5,
    width:Dimensions.get('window').width * 0.4
  },
  serviceSelector:{
    flex:1,
    minWidth:"100%",
    height: 50
  },
  topContainer:{
    flex:1,
    justifyContent:"flex-start",
    alignContent:"center",
    backgroundColor: color.primary,
  },
  container: {
    flex:1,
    width: '100%',
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

export default Performance
