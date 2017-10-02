import React, { Component } from 'react'

import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { Button } from 'react-native-elements'

import { white, lightBlue, orange } from '../utils/colors'

import { connect } from 'react-redux'
import { addCard } from '../actions'

const styles = {
  input: {
    width: 300,
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: `${lightBlue}`,
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    padding: 10,
    width: '100%'
  }
}

class AddCard extends Component {

  constructor() {
    super()
    this.addCard = this.addCard.bind(this)
  }

  state = {
    question: '',
    answer: ''
  }

  addCard() {
    const { addCard, navigation } = this.props
    const title = navigation.state.params.deck.title
    addCard(title, this.state.question, this.state.answer)
    navigation.goBack()
  }

  render() {
    return (
      <View style = {styles.container}>
        <TextInput style={styles.input} placeholder='Question'
            value={this.state.question}
            onChangeText={(question) => { this.setState({ question }) }}
          />
        <TextInput style={styles.input} placeholder='Answer'
            value={this.state.answer}
            onChangeText={(answer) => { this.setState({ answer }) }}
          />
        <View style={styles.button}>
          <Button
            title = "Submit"
            raised
            large
            backgroundColor={orange}
            borderRadius={13}
            color={white}
            onPress={ this.addCard } />
        </View>
      </View>
    )
  }
}

export default connect(null, { addCard })(AddCard)
