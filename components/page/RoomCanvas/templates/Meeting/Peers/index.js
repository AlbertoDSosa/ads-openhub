import { Box } from 'components/ui'
import Peer from '../Peer'

function Peers({ peers }) {
  return (
    <Box>
      {peers.map((peer) => {
        return (
          <Box key={peer.id}>
            <Peer id={peer.id} />
          </Box>
          // <Appear key={peer.id} duration={1000}>
          // </Appear>
        )
      })}
    </Box>
  )
}

export default Peers
