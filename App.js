import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { StackNavigator } from 'react-navigation'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { white, lightBlue } from './utils/colors'
import logger from 'redux-logger'

import { setLocalNotification, getInitialState } from './utils/helpers'

import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import ViewDeck from './components/ViewDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Result from './components/Result'
import reducer from './reducers'

console.disableYellowBox = true

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const AppNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: "Decks",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "AddDeck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      }
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      }
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      title: "Result",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      }
    }
  }
});

const store = createStore(
  reducer,
  getInitialState(),
  compose( applyMiddleware(logger), autoRehydrate() )
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    persistStore(store, { storage: AsyncStorage });

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={lightBlue} barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    )
  }
}
