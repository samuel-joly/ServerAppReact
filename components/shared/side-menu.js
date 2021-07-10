import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, Switch } from 'react-native'

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    margin: 12,
    flex: 1,
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
    fontSize: 14,
  },
  swithBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#222',
  },
  link: {
    padding: 5,
    color: '#892853',
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginTop: 12,
    marginBottom: 6,
  },
})

export default class SideMenu extends React.Component {
  state = {
    toggle_option_one: false,
  }

  callParentScreenFunction = () => this.props.callParentScreenFunction()

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Title title="Timeline" />

          <View style={styles.oneBlock}>
            <View style={styles.swithBlock}>
              <SwitchText text="Ratings with reviews only" />
              <Switch
                onValueChange={(value) =>
                  this.setState({ toggle_option_one: value })
                }
                value={this.state.toggle_option_one}
              />
            </View>
            <Description text="When enabled, on your timeline we will only show ratings with reviews." />
          </View>
        </View>
        <View style={styles.footer}>
          <Text onPress={this.callParentScreenFunction} style={styles.link}>
            Press to call parent function
          </Text>
        </View>
      </SafeAreaView>
    )
  }
}

const Title = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>
}

const SwitchText = ({ text }) => {
  return <Text style={styles.switchText}>{text}</Text>
}

const Description = ({ text }) => {
  return <Text style={styles.description}>{text}</Text>
}
