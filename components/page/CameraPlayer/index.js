import { useRef, useEffect } from 'react'

function CameraPlayer({
  mediaStream,
  mediaTrack,
  width = '320',
  height = '240',
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      if (mediaStream && mediaStream.active) {
        videoRef.current.srcObject = mediaStream
      } else if (mediaTrack) {
        const videoStream = new MediaStream()
        videoStream.addTrack(mediaTrack)
        videoRef.current.srcObject = videoStream
      }
    }
  }, [mediaStream, mediaTrack])

  function handleCanPlay() {
    videoRef.current.play()
  }

  return (
    <video
      width={width}
      height={height}
      ref={videoRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted
      controls={false}
    />
  )
}
export default CameraPlayer
