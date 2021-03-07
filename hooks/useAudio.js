import { useEffect, useState } from 'react'
import Meyda from 'meyda'

const useAudio = ({ mediaStream }) => {
  const [analyser, setAnalyser] = useState(null)
  const [running, setRunning] = useState(false)
  const [features, setFeatures] = useState(null)

  useEffect(() => {
    if (mediaStream) {
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(mediaStream)
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
  }, [mediaStream])

  useEffect(() => {
    if (analyser) {
      if (running) {
        analyser.start()
      } else {
        analyser.stop()
      }
    }
  }, [running, analyser])

  return { running, setRunning, features }
}

export default useAudio
