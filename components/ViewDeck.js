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

class ViewDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  render() {
    // const { deck } = this.props.navigation.state.params
    const { deck } = this.props
    return (
      <View style = {styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            {deck.title}
          </Text>
          <Text>
            {deck.questions.length} cards
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            raised
            large
            title = "Add Card"
            color={white}
            backgroundColor={orange}
            borderRadius={13}
            onPress={ () => this.props.navigation.navigate('AddCard', { deck: deck }) } />
        </View>
        { deck.questions.length > 0 &&
          <View style={styles.button}>
            <Button
              raised
              large
              title = "Start Quiz"
              backgroundColor={orange}
              borderRadius={13}
              color={white}
              onPress={ () => this.props.navigation.navigate('Quiz', { deck: deck }) } />
          </View> }
      </View>
    )
  }
}

const mapStateToProps = ({ decks }, ownProps) => {
  const { title } = ownProps.navigation.state.params.deck
  const deck = decks.find((deck) => {
    return deck.title === title
  })
  return { deck: deck }
}

export default connect(mapStateToProps)(ViewDeck)
