import { useRef, useEffect } from 'react'

function AudioPlayer({ mediaStream }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (mediaStream && mediaStream.active && audioRef.current) {
      audioRef.current.srcObject = mediaStream
    }
  }, [mediaStream])

  function handleCanPlay() {
    audioRef.current.play()
  }

  return <audio ref={audioRef} onCanPlay={handleCanPlay} autoPlay />
}
export default AudioPlayer
