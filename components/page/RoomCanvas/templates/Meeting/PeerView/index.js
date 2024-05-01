import {} from 'react'
import CameraWindow from 'components/page/CameraWindow'
import AudioPlayer from 'components/page/AudioPlayer'

function PeerView({ isMe, audioTrack, videoTrack }) {
  return (
    <>
      {isMe ? (
        <CameraWindow videoTrack={videoTrack} audioTrack={audioTrack} />
      ) : (
        <>
          <CameraWindow videoTrack={videoTrack} audioTrack={audioTrack} />
          <AudioPlayer audioTrack={audioTrack} />
        </>
      )}
    </>
  )
}

export default PeerView
