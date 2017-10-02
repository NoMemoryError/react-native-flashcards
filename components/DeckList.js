import React, { Component } from 'react'

import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { ListItem, Button } from 'react-native-elements'

import { connect } from 'react-redux'

import { fetchDecksSuccess } from '../actions'

import { white, lightBlue, orange } from '../utils/colors'

class DeckList extends Component {

  renderRow = (deck) => {
    const badge = {
      value: deck.questions.length,
      textStyle: { color: white },
      containerStyle: { backgroundColor: lightBlue }
    };

    return (
      <ListItem
        key={deck.title}
        title={deck.title}
        titleStyle={{ fontWeight: 'bold' }}
        badge={badge}
        onPress={() => this.props.navigation.navigate('ViewDeck', { deck: deck, title: deck.title })}
      />
    )
  }

  render() {
    const { decks } = this.props
    const { navigate } = this.props.navigation
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <FlatList
          data={decks}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index}
        />
        <View style={{ padding: 10 }}>
          <Button
            raised
            large
            title = "Add Deck"
            backgroundColor={orange}
            borderRadius={13}
            color={white}
            onPress={() => navigate('AddDeck') } />
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ decks }) => {
  return { decks: decks }
}

export default connect(mapStateToProps, { fetchDecksSuccess })(DeckList)
