import { useState, useEffect } from 'react'

const parseTrack = (track) => {
  const { id, kind, label } = track
  const capabilities = track.getCapabilities()
  const settings = track.getSettings()
  const contraints = track.getConstraints()

  return {
    id,
    kind,
    label,
    deviceId: settings.deviceId,
    groupId: settings.groupId,
    capabilities,
    settings,
    contraints,
  }
}

export default function useUserMedia(contraints) {
  const [mediaStream, setMediaStream] = useState(null)
  const [currentDevices, setCurrentDevices] = useState(null)

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(contraints)
        const devices = {}
        stream.getTracks().forEach((track) => {
          const isVideo = track.kind === 'video'
          const isAudio = track.kind === 'audio'

          if (isVideo) {
            devices.video = parseTrack(track)
          } else if (isAudio) {
            devices.audio = parseTrack(track)
          }
        })

        setMediaStream(stream)
        setCurrentDevices(devices)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else if (mediaStream && !mediaStream.active) {
      mediaStream.getTracks().forEach((track) => {
        track.stop()
      })

      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
    // console.log('user media contraints', contraints)
    // console.log('user media mediaStream', mediaStream)
  }, [mediaStream, contraints])

  return { mediaStream, currentDevices }
}
