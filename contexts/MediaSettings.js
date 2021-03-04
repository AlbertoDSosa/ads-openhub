import { createContext, useEffect } from 'react'
import useContraints from 'hooks/useContraints'
import useDevices from 'hooks/useDevices'

const MediaSettingsContext = createContext({})

export const MediaSettingsProvider = ({ children }) => {
  const {
    mediaDevices,
    currentDevices,
    setSelectedAudioOutput,
    setSelectedVideoInput,
    setSelectedAudioInput,
  } = useDevices()

  const { contraints, changeVideoSource, changeAudioSource } = useContraints()

  useEffect(() => {
    if (currentDevices) {
      const { audioInput, videoInput } = currentDevices
      changeAudioSource({ deviceId: audioInput.deviceId })
      changeVideoSource({ deviceId: videoInput.deviceId })
    }
  }, [])

  const changeAudioOutput = ({ deviceId, label, groupId }) => {
    setSelectedAudioOutput({ deviceId, label, groupId })
  }

  const changeAudioInput = ({ deviceId, label, groupId }) => {
    changeAudioSource({ deviceId })
    setSelectedAudioInput({ deviceId, label, groupId })
  }

  const changeVideoInput = ({ deviceId, label, groupId }) => {
    changeVideoSource({ deviceId })
    setSelectedVideoInput({ deviceId, label, groupId })
  }

  return (
    <MediaSettingsContext.Provider
      value={{
        contraints,
        mediaDevices,
        currentDevices,
        changeVideoInput,
        changeAudioInput,
        changeAudioOutput,
      }}
    >
      {children}
    </MediaSettingsContext.Provider>
  )
}

export default MediaSettingsContext
