import { useEffect, useContext } from 'react'
import { Box } from 'components/ui'
import RoomContext from 'contexts/Room'

import Peers from './Peers'
import Me from './Me'
// import { MeetingRoom } from '@material-ui/icons'

function MeetingRoom() {
  const { roomClient } = useContext(RoomContext)

  useEffect(() => {
    if (roomClient) {
      console.log(roomClient)
      roomClient.join()
    }
  }, [roomClient])

  return (
    <Box>
      <Me />
      <Peers />
    </Box>
  )
}

export default MeetingRoom
