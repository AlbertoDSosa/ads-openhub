export const roomInitialState = {
  url: null,
  state: 'new', // new/connecting/connected/disconnected/closed,
  activeSpeakerId: null,
  statsPeerId: null,
  faceDetection: false,
}

export const roomReducers = (actions) => {
  return {
    [actions.SET_ROOM_URL]: (state, action) => {
      const { url } = action.payload
      const { room } = state

      return { ...state, room: { ...room, url } }
    },
    [actions.SET_ROOM_STATE]: (state, action) => {
      const { state: roomState } = action.payload
      const { me, room } = state

      if (roomState === 'closed') {
        return {
          ...state,
          me: {
            ...me,
            webcamInProgress: false,
            shareInProgress: false,
            audioOnly: false,
            audioOnlyInProgress: false,
            audioMuted: false,
            restartIceInProgress: false,
          },
          room: {
            ...room,
            state: roomState,
            activeSpeakerId: null,
            statsPeerId: null,
          },
        }
      }

      if (roomState === 'connected') {
        return { ...state, room: { ...room, state: roomState } }
      }
    },
    [actions.SET_ROOM_ACTIVE_SPEAKER]: (state, action) => {
      const { peerId } = action.payload
      const { room } = state

      return { ...state, room: { ...room, activeSpeakerId: peerId } }
    },
    [actions.SET_ROOM_STATS_PEER_ID]: (state, action) => {
      const { peerId } = action.payload
      const { room } = state

      if (room.statsPeerId === peerId) {
        return { ...state, room: { ...room, statsPeerId: null } }
      }

      return { ...state, room: { ...room, statsPeerId: peerId } }
    },
    [actions.SET_FACE_DETECTION]: (state, action) => {
      const flag = action.payload
      const { room } = state

      return { ...state, room: { ...room, faceDetection: flag } }
    },
    [actions.REMOVE_PEER_TO_ROOM]: (state, action) => {
      const { peerId } = action.payload
      const { room } = state

      const newState = { ...room }

      if (peerId && peerId === room.activeSpeakerId)
        newState.activeSpeakerId = null

      if (peerId && peerId === room.statsPeerId) newState.statsPeerId = null

      return { ...state, room: newState }
    },
  }
}
