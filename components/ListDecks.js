import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { getDecks } from '../helpers/apis'
import ViewDeckSummary from './ViewDeckSummary'
import { setNotification } from '../helpers/notifications'
import { Notifications } from 'expo'

export default class ListDecks extends Component {
  state = {
    deckList: [],
  }

  componentDidMount() {
    this.updateList()

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.updateList()
      }
    )

    setNotification()
  }

  updateList = () => {
    getDecks().then(deckObject => {
      if (deckObject !== null) {
        this.setState({
          deckList: Object.values(deckObject)
        })
      }
    })
  }

  viewDeckDetails = (deck) => {
    this.props.navigation.navigate('ViewDeckDetails', deck)
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.deckList.length === 0 && (
          <Text>
            Click "Add Deck" below to start.
          </Text>
        )}
        <FlatList
          style={styles.list}
          data={this.state.deckList}
          renderItem={({ item }) => (
            <ViewDeckSummary
              onRowPress={ this.viewDeckDetails }
              key={ item.title }
              deckDetails={ item } />
          )}
          keyExtractor={(item, index) => index}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textDecorationLine: 'underline',
    paddingBottom: 5,
  },
  list: {
    alignSelf: 'stretch'
  }
})
