import { AsyncStorage } from 'react-native'

export const DECKS_ID = 'FlashStudy:decks'

// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }

export function getDecks() {
  return AsyncStorage.getItem(DECKS_ID)
    .then(JSON.parse)
}

export function getDeck (deckID) {
  return AsyncStorage.getItem(DECKS_ID)
    .then(JSON.parse)
    .then((data) => {
      let deck = data[deckID]
      if (deck) {
        return deck
      } else {
        console.log('APIS.JS -> getDeck: ERROR, could not find deck with ID ' + deckID);
      }
    })
}

export function saveDeckTitle (deckTitle) {
  if (deckTitle) {
    return AsyncStorage.getItem(DECKS_ID)
      .then(JSON.parse)
      .then((data) => {
        if (data && data[deckTitle]) {
          console.log('APIS.JS -> saveDeckTitle: ERROR saving, deck with title ' + deckTitle + ' already exists!');
        } else {
          data = data ? data : {}
          data[deckTitle] = {
            title: deckTitle,
            questions: []
          }

          AsyncStorage.setItem(DECKS_ID, JSON.stringify(data))
        }
      })
  }

  return null
}

export function addCardToDeck (deckTitle, cardObject) {
  if (deckTitle) {
    return AsyncStorage.getItem(DECKS_ID)
      .then(JSON.parse)
      .then((data) => {
        if (data[deckTitle]) {
          data[deckTitle].questions.push(cardObject)

          AsyncStorage.setItem(DECKS_ID, JSON.stringify(data))
        } else {
          console.log('APIS.JS -> addCardToDeck: ERROR adding card, deck with title ' + deckTitle + ' does not exist!')
        }

        return AsyncStorage.getItem(DECKS_ID)
        .then(JSON.parse)
        .then(data => (
          data[deckTitle]
        ))
      })
  }
}
