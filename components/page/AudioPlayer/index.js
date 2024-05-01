import { useRef, useEffect } from 'react'

function AudioPlayer({ mediaStream, mediaTrack, audioMuted }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (mediaStream && mediaStream.active && audioRef.current) {
      audioRef.current.srcObject = mediaStream
    } else if (mediaTrack && audioRef.current) {
      const audioStream = new MediaStream()
      audioStream.addTrack(mediaTrack)
      audioRef.current.srcObject = audioStream
    }
  }, [mediaStream, mediaTrack])

  function handleCanPlay() {
    audioRef.current.play()
  }

  return (
    <audio
      ref={audioRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted={audioMuted}
      controls={false}
    />
  )
}
export default AudioPlayer
