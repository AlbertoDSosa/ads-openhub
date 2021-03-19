import { useState, useEffect, useReducer } from 'react'
import randomString from 'random-string'
import useLocalStorage from 'hooks/useLocalStorage'

import RoomClient from '../libs/RoomClient'
import { reducers, initialState } from '../utils/reducers'
import deviceInfo from '../utils/deviceInfo'
import Logger from '../utils/Logger'
// import * as cookiesManager from '../utils/cookiesManager'
// import * as utils from '../utils'

const logger = new Logger()

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
    logger.debug('run() [environment:%s]', process.env.NODE_ENV)
  }, [])

  useEffect(() => {
    if (roomClientConstructor) {
      roomClientConstructor.device = deviceInfo()
      roomClientConstructor.dispatch = dispatch
      roomClientConstructor.peerId = randomString({ length: 8 }).toLowerCase()
      roomClientConstructor.hostname = window.location.hostname
      const _roomClient = new RoomClient(roomClientConstructor)
      setRoomClient(_roomClient)
    }
  }, [roomClientConstructor])

  useEffect(() => {
    setRoomInitialState(state)
    if (roomClient) {
      roomClient.setRoomState(state)
    }
  }, [state, roomClient])

  return { roomClient, setRoomClientConstructor }
}

export default useRoomClient
