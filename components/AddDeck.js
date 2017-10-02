import React, { Component } from 'react'

import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { Button } from 'react-native-elements'

import { white, lightBlue, orange } from '../utils/colors'

import { connect } from 'react-redux'
import { addDeck } from '../actions'

const styles = {
  input: {
    width: 300,
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: `${lightBlue}`,
    marginTop: 200,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    padding: 10
  }
}

class AddDeck extends Component {
  constructor() {
    super()
    this.createDeck = this.createDeck.bind(this)
  }

  state = {
    deckName: '',
  }

  createDeck() {
    const { addDeck, navigation } = this.props
    addDeck(this.state.deckName)
    navigation.goBack()
  }

  render() {
    return (
      <View style = {styles.container}>
        <TextInput style={styles.input}placeholder='Name of the deck'
            value={this.state.deckName}
            onChangeText={(deckName) => { this.setState({ deckName }) }}
          />
        <View style={styles.button}>
          <Button
            raised
            large
            title = "Create Deck"
            backgroundColor={orange}
            borderRadius={13}
            color={white}
            onPress={ this.createDeck } />
        </View>
      </View>
    )
  }
}

export default connect(null, { addDeck })(AddDeck)
