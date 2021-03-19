import { useState, useEffect } from 'react'

export default function useUserMedia(constraints) {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    async function enableStream() {
      try {
        if (!navigator.mediaDevices) {
          navigator.mediaDevices = {}
        }

        if (!navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia =
            navigator.mediaDevices.webkitGetUserMedia ||
            navigator.mediaDevices.mozGetUserMedia ||
            navigator.mediaDevices.msGetUserMedia ||
            (() =>
              Promise.reject(
                new Error('getUserMedia is not supported in this browser')
              ))
        }
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
