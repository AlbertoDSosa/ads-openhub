import { createContext } from 'react'
import useContraints from 'hooks/useContraints'

const MediaSettingsContext = createContext({})

export const MediaSettingsProvider = ({ children }) => {
  const { contraints, changeVideoSource, changeAudioSource } = useContraints()

  return (
    <MediaSettingsContext.Provider
      value={{
        contraints,
        changeVideoSource,
        changeAudioSource,
      }}
    >
      {children}
    </MediaSettingsContext.Provider>
  )
}

export default MediaSettingsContext
