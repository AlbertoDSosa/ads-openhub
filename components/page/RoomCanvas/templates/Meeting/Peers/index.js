import { useContext, useEffect, useState } from 'react'
import RoomContext from 'contexts/Room'

import { Box } from 'components/ui'
import Peer from '../Peer'

function Peers() {
  const { state } = useContext(RoomContext)
  const [peers, setPeers] = useState(null)
  useEffect(() => {
    if (state) {
      const { peers: _peers } = state
      const peersArray = Object.values(_peers)
      setPeers(peersArray)
    }
  }, [state])

  return (
    <Box>
      {peers &&
        peers.map((peer) => {
          return (
            <Box key={peer.id}>
              <Peer peer={peer} />
            </Box>
            // <Appear key={peer.id} duration={1000}>
            // </Appear>
          )
        })}
    </Box>
  )
}

export default Peers
