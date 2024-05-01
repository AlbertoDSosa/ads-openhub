import { useEffect, useState, useContext } from 'react'
import RoomContext from 'contexts/Room'
import PeerView from '../PeerView'

function Peer({ peer }) {
  const { state } = useContext(RoomContext)
  const [audioConsumer, setAudioConsumer] = useState(null)
  const [videoConsumer, setVideoConsumer] = useState(null)

  useEffect(() => {
    if (state) {
      const { consumers } = state

      const consumersArray = peer.consumers.map(
        (consumerId) => consumers[consumerId]
      )
      const _audioConsumer = consumersArray.find(
        (consumer) => consumer.track.kind === 'audio'
      )
      setAudioConsumer(_audioConsumer)
      const _videoConsumer = consumersArray.find(
        (consumer) => consumer.track.kind === 'video'
      )
      setVideoConsumer(_videoConsumer)
    }
  }, [state])

  return (
    <>
      {audioConsumer && videoConsumer ? (
        <PeerView
          audioTrack={audioConsumer.track}
          videoTrack={videoConsumer.track}
        />
      ) : null}
    </>
  )
}

export default Peer
