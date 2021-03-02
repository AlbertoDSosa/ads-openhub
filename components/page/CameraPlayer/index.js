import { useRef, useContext, useEffect } from 'react'
import useUserMedia from 'hooks/useUserMedia'
import MediaSettingsContext from 'contexts/MediaSettings'

function CameraPlayer() {
  const videoRef = useRef(null)
  const { contraints } = useContext(MediaSettingsContext)
  const { mediaStream } = useUserMedia(contraints)

  useEffect(() => {
    if (mediaStream && mediaStream.active && videoRef.current) {
      videoRef.current.srcObject = mediaStream
    }
  }, [contraints, mediaStream])

  function handleCanPlay() {
    videoRef.current.play()
  }

  return (
    <video
      ref={videoRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted
    />
  )
}
export default CameraPlayer
