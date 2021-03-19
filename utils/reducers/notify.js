export const notifyInitialState = []

export const notifyReducers = (actions) => {
  return {
    [actions.ADD_NOTIFICATION]: (state, action) => {
      const { notification } = action.payload
      const { notification: notify } = state

      return { ...state, notification: [...notify, notification] }
    },
    [actions.REMOVE_NOTIFICATION]: (state, action) => {
      const { notificationId } = action.payload
      const { notification } = state
      const newNotifications = notification.filter(
        (notification) => notification.id !== notificationId
      )

      return { ...state, notification: newNotifications }
    },
    [actions.REMOVE_ALL_NOTIFICATIONS]: (state) => {
      return { ...state, notification: [] }
    },
  }
}
