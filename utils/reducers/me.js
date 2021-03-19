export const meInitialState = {
  id: null,
  displayName: null,
  displayNameSet: false,
  device: null,
  canSendMic: false,
  canSendWebcam: false,
  canChangeWebcam: false,
  webcamInProgress: false,
  shareInProgress: false,
  audioOnly: false,
  audioOnlyInProgress: false,
  audioMuted: false,
  restartIceInProgress: false,
}

export const meReducers = (actions) => {
  return {
    [actions.SET_ME]: (state, action) => {
      const { peerId, displayName, displayNameSet, device } = action.payload
      const { me } = state

      return {
        ...state,
        me: { ...me, id: peerId, displayName, displayNameSet, device },
      }
    },
    [actions.SET_MEDIA_CAPABILITIES]: (state, action) => {
      const { canSendMic, canSendWebcam } = action.payload
      const { me } = state

      return { ...state, me: { ...me, canSendMic, canSendWebcam } }
    },
    [actions.SET_CAN_CHANGE_WEBCAM]: (state, action) => {
      const canChangeWebcam = action.payload
      const { me } = state

      return { ...state, me: { ...me, canChangeWebcam } }
    },
    [actions.SET_WEBCAM_IN_PROGRESS]: (state, action) => {
      const { flag } = action.payload
      const { me } = state

      return { ...state, me: { ...me, webcamInProgress: flag } }
    },
    [actions.SET_SHARE_IN_PROGRESS]: (state, action) => {
      const { flag } = action.payload
      const { me } = state

      return { ...state, me: { ...me, shareInProgress: flag } }
    },
    [actions.SET_DISPLAY_NAME]: (state, action) => {
      let { displayName } = action.payload
      const { me } = state

      // Be ready for undefined displayName (so keep previous one).
      if (!displayName) displayName = me.displayName

      return { ...state, me: { ...me, displayName, displayNameSet: true } }
    },
    [actions.SET_AUDIO_ONLY_STATE]: (state, action) => {
      const { enabled } = action.payload
      const { me } = state

      return { ...state, me: { ...me, audioOnly: enabled } }
    },
    [actions.SET_AUDIO_ONLY_IN_PROGRESS]: (state, action) => {
      const { flag } = action.payload
      const { me } = state

      return { ...state, me: { ...me, audioOnlyInProgress: flag } }
    },
    [actions.SET_AUDIO_MUTED_STATE]: (state, action) => {
      const { enabled } = action.payload
      const { me } = state

      return { ...state, me: { ...me, audioMuted: enabled } }
    },
    [actions.SET_RESTART_ICE_IN_PROGRESS]: (state, action) => {
      const { flag } = action.payload
      const { me } = state

      return { ...state, me: { ...me, restartIceInProgress: flag } }
    },
  }
}
