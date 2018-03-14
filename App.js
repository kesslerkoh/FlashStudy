import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './helpers/colors'
import ListDecks from './components/ListDecks'
import AddDeck from './components/AddDeck'
import ViewDeckDetails from './components/ViewDeckDetails'
import AddCardToDeck from './components/AddCardToDeck'
import StartQuiz from './components/StartQuiz'
import { getDecks } from './helpers/apis.js'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const Tabs = TabNavigator({
  ViewDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
    }
  }
}, {
  navigationOptions: {
    title: 'FlashStudy: Study in a flash',
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    labelStyle: {
      fontSize: 16
    },
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  ViewDeckDetails: {
    screen: ViewDeckDetails,
  },
  AddCard: {
    screen: AddCardToDeck,
  },
  ViewQuiz: {
    screen: StartQuiz,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
