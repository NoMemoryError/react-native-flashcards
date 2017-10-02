import React, { Component } from 'react'

import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { Button } from 'react-native-elements'

import { white, lightBlue, orange } from '../utils/colors'

import { connect } from 'react-redux'
import { addDeck } from '../actions'

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    padding: 10,
    width: '100%'
  }
}

class Result extends Component {
  // this.props.navigation.navigate('ViewDeck', { deck: deck, title: deck.title })
  render() {
    const { correct, total, deck, quizRouteKey } = this.props.navigation.state.params
    return (
      <View style = {styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            {correct} / {total}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            raised
            large
            title = "Restart Quiz"
            color={white}
            backgroundColor={orange}
            borderRadius={13}
            onPress={ () => this.props.navigation.goBack() } />
        </View>
        <View style={styles.button}>
          <Button
            raised
            large
            title = "Back to Deck"
            backgroundColor={orange}
            borderRadius={13}
            color={white}
            onPress={ () => this.props.navigation.goBack(quizRouteKey) } />
        </View>
      </View>
    )
  }
}


export default Result
