import React from 'react'
import { Box } from 'components/ui'
import Peers from './Peers'
// import { MeetingRoom } from '@material-ui/icons'

function MeetingRoom() {
  return (
    <Box>
      <Peers peers={[]} />
    </Box>
  )
}

export default MeetingRoom
