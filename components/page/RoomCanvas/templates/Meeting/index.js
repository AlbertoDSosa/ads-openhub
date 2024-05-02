import { useEffect } from 'react'
import { Box } from 'components/ui'
import { useMeetingRoom } from 'contexts/Room'

import Peers from './Peers'
import Me from './Me'
// import { MeetingRoom } from '@material-ui/icons'

function MeetingRoom() {
  const { roomClient } = useMeetingRoom()

  useEffect(() => {
    if (roomClient) {
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
