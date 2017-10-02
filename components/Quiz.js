import React, { Component } from 'react'

import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import FlipCard from 'react-native-flip-card'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

import { white, lightBlue, orange, red, green } from '../utils/colors'

const { width, height } = Dimensions.get('window')

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
  },
  card: {
    borderWidth: 1,
    borderRadius: 13,
    borderColor: `${lightBlue}`,
    width: width - 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  face: {
    flex: 1,
    justifyContent: 'center'
  }
}

class Quiz extends Component {
  state = {
    questions: [],
    index: 0,
    correct: 0
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params
    this.setState({ questions: deck.questions })
  }

  nextQuestion(lastAnswerCorrect) {
    let { correct, questions, index } = this.state
    index += 1
    if(lastAnswerCorrect === true) {
      correct += 1
    }
    if(index < questions.length) {
      this.setState({ index, correct })
    } else {
      const { deck } = this.props.navigation.state.params
      this.setState({index: 0, correct: 0})
      this.props.navigation.navigate('Result', { correct, total: questions.length, deck, quizRouteKey: this.props.navigation.state.key })
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  render() {
    const { index, questions } = this.state
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{index+1} / {questions.length}</Text>
        { questions.length > 0 && <View style={{height: '50%', marginTop: 10}}>
          <FlipCard
            style={styles.card}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            {/* Face Side */}
            <View style={styles.face}>
              <Text style={{color: `${green}`}}>{questions[index].question}</Text>
            </View>
            {/* Back Side */}
            <View style={styles.face}>
              <Text style={{color: `${red}`}}>{questions[index].answer}</Text>
            </View>
          </FlipCard>
        </View> }
        <View style={styles.button}>
          <Button
            raised
            large
            title = "Correct"
            color={white}
            backgroundColor={green}
            borderRadius={13}
            onPress={ () => this.nextQuestion(true) } />
        </View>
        <View style={styles.button}>
          <Button
            raised
            large
            title = "Incorrect"
            backgroundColor={red}
            borderRadius={13}
            color={white}
            onPress={ () => this.nextQuestion(false) } />
        </View>
      </View>
    )
  }
}

export default Quiz
