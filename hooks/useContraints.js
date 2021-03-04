import { useReducer } from 'react'

const actions = {
  SET_ACTIVATE_VIDEO: 'video->toogle_activate',
  SET_ACTIVATE_AUDIO: 'audio->toogle_activate',
  SET_VIDEO_SOURCE: 'video->set_source',
  SET_AUDIO_SOURCE: 'audio->set_source',
}

const reducers = {
  [actions.SET_ACTIVATE_VIDEO]: (state, action) => {
    const { active, deviceId } = action.payload

    if (active) {
      return {
        ...state,
        video: { deviceId: { exact: deviceId } },
      }
    }

    return {
      ...state,
      video: active,
    }
  },
  [actions.SET_ACTIVATE_AUDIO]: (state, action) => {
    const { active, deviceId } = action.payload

    if (active) {
      return {
        ...state,
        video: { deviceId: { exact: deviceId } },
      }
    }

    return {
      ...state,
      video: active,
    }
  },
  [actions.SET_VIDEO_SOURCE]: (state, action) => {
    if (action.payload === 'default') {
      return {
        ...state,
        video: true,
      }
    }
    return {
      ...state,
      video: { deviceId: { exact: action.payload } },
    }
  },
  [actions.SET_AUDIO_SOURCE]: (state, action) => ({
    ...state,
    audio: { deviceId: { exact: action.payload } },
  }),
}

const reducer = (state, action) => {
  const actionReducer = reducers[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

const initialState = {
  video: true,
  audio: true,
}

const useContraints = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    contraints: state,
    changeVideoSource: ({ deviceId }) => {
      dispatch({ type: actions.SET_VIDEO_SOURCE, payload: deviceId })
    },
    changeAudioSource: ({ deviceId }) => {
      dispatch({ type: actions.SET_AUDIO_SOURCE, payload: deviceId })
    },
    toggleVideoActive: ({ active, deviceId }) => {
      dispatch({
        type: actions.SET_ACTIVATE_VIDEO,
        payload: { active, deviceId },
      })
    },
    toggleAudioActive: ({ active, deviceId }) => {
      dispatch({
        type: actions.SET_ACTIVATE_AUDIO,
        payload: { active, deviceId },
      })
    },
  }
}

export default useContraints
