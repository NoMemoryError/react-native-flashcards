export const FETCH_DECKS = "actions/FETCH_DECKS"
export function fetchDecks() {
  return {
    type: FETCH_DECKS
  }
}
export const FETCH_DECKS_SUCCESS = "actions/FETCH_DECKS_SUCCESS"
export function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks
  }
}

export const ADD_DECK = "actions/ADD_DECK"
export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export const ADD_CARD = "actions/ADD_CARD"
export function addCard(title, question, answer) {
  return {
    type: ADD_CARD,
    title,
    question,
    answer
  }
}
