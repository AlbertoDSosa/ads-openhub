import { useContext, useEffect, useState } from 'react'
import PeerView from '../PeerView'
import RoomContext from 'contexts/Room'

function Me() {
  const { state } = useContext(RoomContext)
  const [audioProducer, setAudioProducer] = useState(null)
  const [videoProducer, setVideoProducer] = useState(null)
  const { producers } = state

  useEffect(() => {
    if (state) {
      const producersArray = Object.values(producers)
      const _audioProducer = producersArray.find(
        (producer) => producer.track.kind === 'audio'
      )
      setAudioProducer(_audioProducer)
      const _videoProducer = producersArray.find(
        (producer) => producer.track.kind === 'video'
      )
      setVideoProducer(_videoProducer)
    }
  }, [state])
  return (
    <>
      {audioProducer && videoProducer ? (
        <PeerView
          isMe
          audioTrack={audioProducer.track}
          videoTrack={videoProducer.track}
        />
      ) : null}
    </>
  )
}

export default Me
