import { useReducer } from 'react'

const actions = {
  SET_ACTIVATE_VIDEO: 'video->toogle_activate',
  SET_ACTIVATE_AUDIO: 'audio->toogle_activate',
  SET_VIDEO_SOURCE: 'video->set_source',
  SET_AUDIO_SOURCE: 'audio->set_source',
}

const reducers = {
  [actions.SET_ACTIVATE_VIDEO]: (state, action) => {
    const { active, id } = action.payload

    if (active) {
      return {
        ...state,
        video: { deviceId: { exact: id } },
      }
    }

    return {
      ...state,
      video: active,
    }
  },
  [actions.SET_ACTIVATE_AUDIO]: (state, action) => {
    const { active, id } = action.payload

    if (active) {
      return {
        ...state,
        video: { deviceId: { exact: id } },
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
    changeVideoSource: ({ id }) => {
      dispatch({ type: actions.SET_VIDEO_SOURCE, payload: id })
    },
    changeAudioSource: ({ id }) => {
      dispatch({ type: actions.SET_AUDIO_SOURCE, payload: id })
    },
    toggleVideoActive: ({ active, id }) => {
      dispatch({ type: actions.SET_ACTIVATE_VIDEO, payload: { active, id } })
    },
    toggleAudioActive: ({ active, id }) => {
      dispatch({ type: actions.SET_ACTIVATE_AUDIO, payload: { active, id } })
    },
  }
}

export default useContraints
