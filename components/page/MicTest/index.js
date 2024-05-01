import { useState, useEffect } from 'react'
import useAudio from 'hooks/useAudio'
import { Box } from 'components/ui'

function MicTest({ mediaTrack, mediaStream, borderColor = 'black' }) {
  const [running, setRunning, features] = useAudio({ mediaStream, mediaTrack })
  const [micValue, setMicValue] = useState(0)

  useEffect(() => {
    setRunning(true)
  }, [])

  useEffect(() => {
    if (running) {
      setMicValue(features.rms * 10)
    }
  }, [features])

  return (
    <Box
      marginLeft=".5rem"
      width="4rem"
      height=".5rem"
      border={`1px ${borderColor} solid`}
    >
      <Box width={micValue} height="100%" bgcolor="green" />
    </Box>
  )
}

export default MicTest
