import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getDeck } from '../helpers/apis'
import { red, green, white, purple } from '../helpers/colors'
import { resetNotifications } from '../helpers/notifications'

export default class StartQuiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  }

  state = {
    title: '',
    cards: [],
    currentCard: 0,
    score: 0,
    faceShown: 'question',
    finished: false,
  }

  componentDidMount() {
    getDeck(this.props.navigation.state.params.title)
      .then(response => {
        if (response && response.title && response.questions) {
          this.setState({
            title: response.title,
            cards: response.questions,
          })
        }
      })
  }

  toggleFaceShown = () => {
    this.state.faceShown === 'question'
      ? this.setState({ faceShown: 'answer' })
      : this.setState({ faceShown: 'question' })
  }

  goToNextQuestion = (answeredCorrectly) => {
    const { currentCard, cards } = this.state

    if (answeredCorrectly) {
      this.setState((state) => {
        return { score: state.score+1 }
      })
    }

    if (currentCard + 1 < cards.length) {
      this.setState({
        currentCard: currentCard + 1,
      })
    } else {
      this.setState({
        finished: true,
      })

      resetNotifications()
    }
  }

  goHome = () => {
    this.reset()
    this.props.navigation.popToTop()
  }

  goBack = (screen) => {
    if (screen === 'restart') {
      this.setState({
        currentCard: 0,
        score: 0,
        finished: false,
        faceShown: 'question',
      })
    } else if (screen === 'deckDetails') {
      this.reset()
      // this.props.navigation.navigate('ViewDeckDetails',{title: this.state.title})
      this.props.navigation.pop()
    }
  }

  reset = () => {
    this.setState({
      title: '',
      cards: [],
      currentCard: 0,
      score: 0,
      faceShown: 'question',
      finished: false,
    })
  }

  render() {
    const { title, cards, currentCard, score, faceShown, finished } = this.state

    if (finished) {
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text>
            Finished! You scored { score } points, { (score/cards.length)*100 }% correct.
          </Text>
          <TouchableOpacity onPress={this.goHome} style={[styles.button, {backgroundColor: purple}]}>
            <Text style={styles.buttonText}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.goBack('restart')} style={[styles.button, {backgroundColor: purple}]}>
            <Text style={styles.buttonText}>
              Restart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.goBack('deckDetails')} style={[styles.button, {backgroundColor: purple}]}>
            <Text style={styles.buttonText}>
              Back to deck
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (title !== '') {
      return (
        <View style={styles.container}>
          <Text style={styles.pagination}>
            { currentCard } / { cards.length }
          </Text>
          <View style={styles.content}>
            <Text style={styles.mainItem}>
              { faceShown === 'question'
                ? cards[currentCard].question
                : cards[currentCard].answer
              }
            </Text>
            <TouchableOpacity onPress={this.toggleFaceShown}>
              <Text style={styles.faceShown}>
                { faceShown }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.answerButtons}>
            <TouchableOpacity onPress={() => this.goToNextQuestion(true)} style={[styles.button, {backgroundColor: green}]}>
              <Text style={[styles.faceShown, {backgroundColor: green, color: white}]}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goToNextQuestion(false)} style={[styles.button, {backgroundColor: red}]}>
              <Text style={[styles.faceShown, {color: white}]}>
                Incorrect
              </Text>
            </TouchableOpacity>
            <View style={{height: 100}}>
            </View>
          </View>
        </View>
      )
    } else {
      return (
       <ActivityIndicator style={{margin: 'auto', marginTop: 100}} />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pagination: {
    padding: 8,
    alignSelf: 'flex-start',
    fontSize: 18,
  },
  content: {
    alignItems: 'center',
  },
  mainItem: {
    fontSize: 22,
  },
  faceShown: {
    color: red,
    fontSize: 18,
    textAlign: 'center',
  },
  answerButtonsDiv: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    width: 120,
    height: 30,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: white,
    textAlign: 'center',
  },
})
