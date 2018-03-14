import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'FlashStudy:notifications'

function createNotification() {
  return {
    title: 'Study with FlashStudy!',
    body: "Don't forget to study today.",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function resetNotifications() {
  scheduleNotification()
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        scheduleNotification()
      }
    })
}

function scheduleNotification() {
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(21)
        tomorrow.setMinutes(10)

        Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time: tomorrow,
            repeat: 'minute',
          }
        )

        AsyncStorage.setItem(NOTIFICATION_KEY, 'set!')
      }
    })

}
