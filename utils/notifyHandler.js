import randomString from 'random-string'
import { notifyActions } from 'utils/actions'

const notifyHandler = ({ type, text, title, timeout }, dispatch) => {
  if (!timeout) {
    switch (type) {
      case 'info':
        timeout = 3000
        break
      case 'error':
        timeout = 5000
        break
    }
  }

  const notification = {
    id: randomString({ length: 6 }).toLowerCase(),
    type,
    title,
    text,
    timeout,
  }

  dispatch({
    type: notifyActions.ADD_NOTIFICATION,
    payload: { notification },
  })

  setTimeout(() => {
    dispatch({
      type: notifyActions.REMOVE_NOTIFICATION,
      payload: { notificationId: notification.id },
    })
  }, timeout)
}

export default notifyHandler
