import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../helpers/colors'
import { addCardToDeck } from '../helpers/apis'

export default class AddCardToDeck extends Component {
  static navigationOptions = {
    title: 'Add Card'
  }

  state = {
    question: '',
    answer: '',
  }

  submitNewCard = () => {
    const { navigation } = this.props
    const { params } = navigation.state

    const { question, answer } = this.state

    if (question && answer) {
      addCardToDeck(
        params.title,
        {
          question: question,
          answer: answer
        })
      .then(response => {
        navigation.pop()
      })
    }
  }

  render() {
    const { navigation } = this.props
    const { params } = navigation.state

    return (
      <View style={styles.container}>
        <Text>
          Deck name: {params.title}
        </Text>
        <TextInput
          placeholder='Question'
          style={styles.inputField}
          onChangeText={(text) => this.setState({question: text})} />

        <TextInput
          placeholder='Answer'
          style={styles.inputField}
          onChangeText={(text) => this.setState({answer: text})} />

        <TouchableOpacity
          onPress={this.submitNewCard}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Submit new card
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: white,
  },
  inputField: {
    alignSelf: 'stretch',
    borderWidth: 1,
    margin: 10,
  },
})
