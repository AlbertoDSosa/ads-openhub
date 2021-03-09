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

const useTracks = ({ mediaStream }) => {
  const [currentTracks, setCurrentTracks] = useState(null)
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    if (mediaStream) {
      const _tracks = mediaStream.getTracks()

      _tracks.forEach((track) => {
        const isVideo = track.kind === 'video'
        const isAudio = track.kind === 'audio'
        const devices = {}

        if (isVideo) {
          devices.video = parseTrack(track)
        } else if (isAudio) {
          devices.audio = parseTrack(track)
        }
        setTracks(_tracks)
        setCurrentTracks(devices)
      })
    }
  }, [mediaStream])

  return { currentTracks, tracks }
}

export default useTracks
