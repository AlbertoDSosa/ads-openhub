import { useEffect, useState } from 'react'
import Meyda from 'meyda'

const useAudio = ({ mediaStream, mediaTrack }) => {
  const [analyser, setAnalyser] = useState(null)
  const [running, setRunning] = useState(false)
  const [features, setFeatures] = useState(null)

  useEffect(() => {
    if (mediaStream || mediaTrack) {
      const audioContext = new AudioContext()
      let source = null

      if (mediaStream) {
        source = audioContext.createMediaStreamSource(mediaStream)
      } else {
        const audioStream = new MediaStream()
        audioStream.addTrack(mediaTrack)
        source = audioContext.createMediaStreamSource(audioStream)
      }

      const _analyser = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ['rms'],
        callback: (features) => {
          setFeatures(features)
        },
      })

      setAnalyser(_analyser)

      return () => {
        if (_analyser) {
          _analyser.stop()
        }
        if (audioContext) {
          audioContext.close()
        }
      }
    }
  }, [mediaStream, mediaTrack])

  useEffect(() => {
    if (analyser) {
      if (running) {
        analyser.start()
      } else {
        analyser.stop()
      }
    }
  }, [running, analyser])

  return [running, setRunning, features]
}

export default useAudio
