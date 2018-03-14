import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native'
import { saveDeckTitle } from '../helpers/apis'
import { white, purple, black } from '../helpers/colors'

class AddDeck extends Component {
  state = {
    newDeckTitle: ''
  }

  submitNewDeck = () => {
    if (this.state.newDeckTitle !== null && this.state.newDeckTitle !== '') {
        let newTitle = this.state.newDeckTitle
        saveDeckTitle(newTitle).then(response => {
          this.props.navigation.replace('ViewDecks')
          this.props.navigation.navigate('ViewDeckDetails', {title: newTitle})
        })

        this.setState({newDeckTitle: ''})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>
          What is the title of your new deck?
        </Text>

          <TextInput
            onChangeText={(text) => this.setState({newDeckTitle: text})}
            placeholder='Deck Title'
            style={styles.textInput}
          />

          <TouchableOpacity onPress={this.submitNewDeck} style={ Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn }>
            <Text style={styles.submitBtnText}>
              Create new deck
            </Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: purple
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    color: black,
    margin: 5,
    textAlign: 'center',
    padding: 5
  }
})

export default AddDeck
