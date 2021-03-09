import { useReducer, useEffect } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

const audioActions = {
  SET_VIDEO_SOURCE: 'video->set_source',
  SET_AUDIO_SOURCE: 'audio->set_source',
}

const videoActions = {
  SET_VIDEO_SOURCE: 'video->set_source',
  SET_AUDIO_SOURCE: 'audio->set_source',
}

const audioReducers = {
  [audioActions.SET_ACTIVATE_AUDIO]: (state, action) => {
    const { active, deviceId } = action.payload

    if (active && deviceId !== 'default') {
      return {
        ...state,
        audio: { deviceId: { exact: deviceId } },
      }
    } else if (active && deviceId === 'default') {
      return {
        ...state,
        audio: true,
      }
    }

    return {
      ...state,
      audio: false,
    }
  },
  [audioActions.SET_AUDIO_SOURCE]: (state, action) => {
    if (action.payload === 'default') {
      return {
        ...state,
        audio: true,
      }
    }
    return {
      ...state,
      audio: { deviceId: { exact: action.payload } },
    }
  },
}

const videoReducers = {
  [videoActions.SET_ACTIVATE_VIDEO]: (state, action) => {
    const { active, deviceId } = action.payload

    if (active && deviceId !== 'default') {
      return {
        ...state,
        video: { deviceId: { exact: deviceId } },
      }
    } else if (active && deviceId === 'default') {
      return {
        ...state,
        video: true,
      }
    }

    return {
      ...state,
      video: false,
    }
  },
  [videoActions.SET_VIDEO_SOURCE]: (state, action) => {
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
}

const reducer = (reducers) => {
  return (state, action) => {
    const actionReducer = reducers[action.type]
    return actionReducer ? actionReducer(state, action) : state
  }
}

const useConstraints = () => {
  const [videoInitialState, setVideoInitialState] = useLocalStorage(
    'videoConstraints',
    {
      video: true,
    }
  )
  const [audioInitialState, setAudioInitialState] = useLocalStorage(
    'audioConstraints',
    {
      audio: true,
    }
  )

  const [videoState, videoDispatch] = useReducer(
    reducer(videoReducers),
    videoInitialState
  )
  const [audioState, audioDispatch] = useReducer(
    reducer(audioReducers),
    audioInitialState
  )

  useEffect(() => {
    setAudioInitialState(audioState)
    setVideoInitialState(videoState)
  }, [audioState, videoState])

  return {
    audioConstraints: audioState,
    videoConstraints: videoState,
    changeVideoSource: ({ deviceId }) => {
      videoDispatch({ type: videoActions.SET_VIDEO_SOURCE, payload: deviceId })
    },
    changeAudioSource: ({ deviceId }) => {
      audioDispatch({ type: audioActions.SET_AUDIO_SOURCE, payload: deviceId })
    },
    changeVideoActive: ({ active, deviceId }) => {
      videoDispatch({
        type: videoActions.SET_ACTIVATE_VIDEO,
        payload: { active, deviceId },
      })
    },
    changeAudioActive: ({ active, deviceId }) => {
      audioDispatch({
        type: audioActions.SET_ACTIVATE_AUDIO,
        payload: { active, deviceId },
      })
    },
  }
}

export default useConstraints
