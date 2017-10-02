import { initializeStore, saveDeckTitle, getDecks } from '../api'
import * as actions from '../actions';

function decks (state = { decks: [] }, action) {
  switch (action.type) {
    case actions.FETCH_DECKS_SUCCESS:
      return { ...state, decks: action.decks }
    case actions.ADD_DECK:
      return { ...state, decks: [...state.decks, { title: action.title, questions: [] }]}
    case actions.ADD_CARD:
      const decks = state.decks.map((deck) => {
        let newDeck = {}
        newDeck.title = deck.title
        newDeck.questions = deck.questions
        if(deck.title === action.title) {
          newDeck.questions.push({ question: action.question, answer: action.answer})
        }
        return newDeck
      })
      return { ...state, decks: decks }
    default :
      return state
  }
}

export default decks
