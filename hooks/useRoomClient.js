import { useState, useEffect, useReducer } from 'react'
import randomString from 'random-string'
import useLocalStorage from 'hooks/useLocalStorage'

import RoomClient from '../libs/RoomClient'
import { reducers, initialState } from '../utils/reducers'
import deviceInfo from '../utils/deviceInfo'

// import * as cookiesManager from '../utils/cookiesManager'
// import * as utils from '../utils'

const peerId = randomString({ length: 8 }).toLowerCase()

const reducer = (state, action) => {
  const actionReducer = reducers[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

const useRoomClient = () => {
  const [roomInitialState, setRoomInitialState] = useLocalStorage(
    'roomClient',
    initialState
  )
  const [state, dispatch] = useReducer(reducer, roomInitialState)
  const [roomClient, setRoomClient] = useState(null)
  const [roomClientConstructor, setRoomClientConstructor] = useState(null)

  useEffect(() => {
    if (roomClientConstructor) {
      roomClientConstructor.device = deviceInfo()
      roomClientConstructor.dispatch = dispatch
      roomClientConstructor.peerId = peerId
      roomClientConstructor.hostname = window.location.hostname
      roomClientConstructor.navigator = window.navigator
      const _roomClient = new RoomClient(roomClientConstructor)
      setRoomClient(_roomClient)
    }
  }, [roomClientConstructor])

  useEffect(() => {
    if (roomClient) {
      setRoomInitialState(state)
      roomClient.setRoomState(state)
    }
  }, [state, roomClient])

  return { roomClient, setRoomClientConstructor, dispatch }
}

export default useRoomClient
