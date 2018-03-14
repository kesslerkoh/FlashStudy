import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { purple, white } from '../helpers/colors'
import { getDeck } from '../helpers/apis'

export default class ViewDeckDetails extends Component {
  static navigationOptions = {
    title: 'Deck Details'
  }

  state = {
    title: '',
    questions: [],
  }

  componentDidMount() {
    this.updateDeckDetails()

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.updateDeckDetails()
      }
    )
  }

  updateDeckDetails = () => {
    const { navigation } = this.props
    const { params } = navigation.state

    getDeck(params.title)
      .then(response => {
        this.setState({
          questions: response.questions
        })
    })
  }

  addCard = () => {
    const { navigation } = this.props
    const { params } = navigation.state
    navigation.navigate('AddCard',{ title: params.title })
  }

  startQuiz = () => {
    const { navigation } = this.props
    const { params } = navigation.state
    navigation.navigate('ViewQuiz',{ title: params.title })
  }

  render() {
    const { navigation } = this.props
    const { params } = navigation.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          { params.title }
        </Text>
        <Text>
          { this.state.questions.length } cards
        </Text>
        <TouchableOpacity onPress={this.addCard} style={[styles.button, { marginTop: 20 }]}>
          <Text style={styles.buttonText}>
            Add card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.startQuiz} disabled={this.state.questions.length === 0} style={styles.button}>
          <Text style={styles.buttonText}>
            Start quiz
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
    paddingTop: 20,
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
  title: {
    fontSize: 18,
    paddingBottom: 5,
  },
})
