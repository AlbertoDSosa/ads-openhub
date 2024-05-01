import { createContext, useEffect } from 'react'
import useRoomClient from 'hooks/useRoomClient'
import useAuth from 'hooks/useAuth'
// import MediaSettingsContext from './MediaSettings'

const RoomContext = createContext({})

export const RoomProvider = ({ children, roomId }) => {
  // const {} = useContext(MediaSettingsContext)
  const { user } = useAuth()
  const { state, roomClient, setRoomClientConstructor } = useRoomClient()

  useEffect(() => {
    if (user) {
      setRoomClientConstructor({
        roomId,
        displayName: user.displayName,
        produce: true,
        consume: true,
      })
    }
  }, [user])

  // const toggleAudioActive = ({ active, deviceId }) => {

  // }

  // const toggleVideoActive = ({ active, deviceId }) => {

  // }

  return (
    <RoomContext.Provider value={{ state, roomClient }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext
