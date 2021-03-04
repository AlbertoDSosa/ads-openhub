import { createContext } from 'react'
import useContraints from 'hooks/useContraints'
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

  const { contraints, changeVideoSource, changeAudioSource } = useContraints()

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
        currentDevices: {
          videoInput: selectedVideoInput,
          audioInput: selectedAudioInput,
          audioOutput: selectedAudioOutput,
        },
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
