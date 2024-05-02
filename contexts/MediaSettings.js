import { createContext, useContext } from 'react'
import useConstraints from 'hooks/useConstraints'
import useLocalStorage from 'hooks/useLocalStorage'

const MediaSettingsContext = createContext({})

export const MediaSettingsProvider = ({ children }) => {
  const [selectedVideoInput, setSelectedVideoInput] = useLocalStorage(
    'selectedVideoInput',
    {
      deviceId: 'default',
      label: 'Predeterminado',
    }
  )
  const [selectedAudioInput, setSelectedAudioInput] = useLocalStorage(
    'selectedAudioInput',
    {
      deviceId: 'default',
      label: 'Predeterminado',
    }
  )
  const [selectedAudioOutput, setSelectedAudioOutput] = useLocalStorage(
    'selectedAudioOutput',
    {
      deviceId: 'default',
      label: 'Predeterminado',
    }
  )

  const {
    audioConstraints,
    videoConstraints,
    changeVideoSource,
    changeAudioSource,
    changeAudioActive,
    changeVideoActive,
  } = useConstraints()

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

  const toggleAudioActive = ({ active, deviceId }) => {
    changeAudioActive({ active, deviceId })
    setSelectedAudioInput({ ...selectedVideoInput, deviceId })
  }

  const toggleVideoActive = ({ active, deviceId }) => {
    changeVideoActive({ active, deviceId })
    setSelectedVideoInput({ ...selectedVideoInput, deviceId })
  }

  return (
    <MediaSettingsContext.Provider
      value={{
        audioConstraints,
        videoConstraints,
        currentDevices: {
          videoInput: selectedVideoInput,
          audioInput: selectedAudioInput,
          audioOutput: selectedAudioOutput,
        },
        changeVideoInput,
        changeAudioInput,
        changeAudioOutput,
        toggleAudioActive,
        toggleVideoActive,
      }}
    >
      {children}
    </MediaSettingsContext.Provider>
  )
}

export const useMediaSettings = () => useContext(MediaSettingsContext)
