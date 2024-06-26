import { useRef, useEffect } from 'react'

function CameraPlayer({ mediaStream }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (mediaStream && mediaStream.active && videoRef.current) {
      videoRef.current.srcObject = mediaStream
    }
  }, [mediaStream])

  function handleCanPlay() {
    videoRef.current.play()
  }

  return (
    <video
      width={320}
      height={240}
      ref={videoRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted
    />
  )
}
export default CameraPlayer
