import { useEffect } from 'react'
import Link from 'components/ui/Link'

import { useMeetingRoom } from 'contexts/Room'

import { Text, Box, Button } from 'components/ui'

const MeatingRoomState = ({ roomId }) => {
  const { state, roomClient } = useMeetingRoom()

  useEffect(() => {
    if (roomClient) {
      // console.log(state)
    }
  }, [roomClient, state])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      m={2}
    >
      <Text variant="h6" color="textPrimary">
        ¿Todo listo para unirte?
      </Text>
      <Box my={2} textAlign="center">
        <Text>Aún no ha llegado nadie</Text>
      </Box>
      <Link to={`/room/${roomId}`}>
        <Button variant="contained" color="primary">
          Unirse ahora
        </Button>
      </Link>
    </Box>
  )
}

export default MeatingRoomState
