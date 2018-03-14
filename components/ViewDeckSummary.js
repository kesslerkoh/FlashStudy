import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class ViewDeckSummary extends Component {
  viewDeckDetails = () => {
    this.props.onRowPress(this.props.deckDetails)
  }

  render() {
    const { deckDetails } = this.props
    return (
      <TouchableOpacity
        onPress={this.viewDeckDetails}>
        <View style={styles.container}>
          <Text style={styles.title}>
            { deckDetails.title }
          </Text>
          <Text style={styles.detail}>
            { deckDetails.questions.length } cards
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  title: {
    textAlign: 'center',
  },
  detail: {
    textAlign: 'center',
  },
})
