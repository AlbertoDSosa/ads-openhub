import { useState, useEffect } from 'react'

export default function useUserMedia(constraints) {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setMediaStream(stream)
      } catch (err) {
        setMediaStream(null)
      }
    }

    if (!mediaStream || !mediaStream.active) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, constraints])

  return [mediaStream]
}
