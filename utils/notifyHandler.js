import randomString from 'random-string'

export default ({ type, text, title, timeout }, dispatch) => {
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
    type: 'ADD_NOTIFICATION',
    payload: { notification },
  })

  setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: { notificationId: notification.id },
    })
  }, timeout)
}
