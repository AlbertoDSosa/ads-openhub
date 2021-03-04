import { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MediaSettingsContext from 'contexts/MediaSettings'

import { Text, Menu, Box, Button, Input } from 'components/ui'
import { FormControl, Select, FormGroup } from 'components/ui/Form'
import { TabPanel } from 'components/ui/Tabs'

import Headset from '@material-ui/icons/HeadsetOutlined'
import { MicNone, MoreHoriz } from '@material-ui/icons'

const { Item: MenuItem } = Menu
const { InputLabel } = Input

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  option: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

function AudioPanel({ value, index, mediaSettings }) {
  const classes = useStyles()
  const { currentAudioDevices, audioDevices } = mediaSettings
  const { audioInput, audioOutput } = currentAudioDevices
  const { audioInputs, audioOutputs } = audioDevices

  const { changeAudioInput, changeAudioOutput } = useContext(
    MediaSettingsContext
  )
  const [audioOutputTest, setAudioOutputTest] = useState(true)
  const [audioTest, setAudioTest] = useState(null)

  useEffect(() => {
    const audio = new Audio('/audio/pink_noise.ogg')
    const audioReady = () => {
      setAudioTest(audio)
    }
    audio.addEventListener('canplaythrough', audioReady)
    return () => {
      audio.removeEventListener('canplaythrough', audioReady)
    }
  }, [])

  const handleAudioInputChange = (evt, el) => {
    const { value, label } = el.props
    changeAudioInput({ deviceId: value, label })
  }

  const handleAudioOutputChange = (evt, el) => {
    const { value, label } = el.props
    changeAudioOutput({ deviceId: value, label })
  }

  const handleAudioTestEnd = () => {
    setAudioOutputTest(true)
  }

  return (
    <TabPanel value={value} index={index}>
      <Box p={1} display="flex" flexDirection="column" width="100%">
        <FormGroup row>
          <FormControl className={classes.formControl}>
            <InputLabel id="label-audio-input" shrink>
              Micrófono
            </InputLabel>

            <Select
              onChange={handleAudioInputChange}
              labelId="label-audio-input"
              id="select-audio-input"
              className={classes.selectEmpty}
              value=""
              displayEmpty
              renderValue={() => (
                <Text className={classes.option} variant="body2">
                  {audioInput.label}
                </Text>
              )}
            >
              {audioInputs.map((input, index) => {
                const { label, deviceId } = input

                return (
                  <MenuItem label={label} value={deviceId} key={index}>
                    <Text className={classes.option} variant="body2">
                      {label}
                    </Text>
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center">
            <MicNone /> <MoreHoriz />
          </Box>
        </FormGroup>
        <FormGroup row>
          <FormControl className={classes.formControl}>
            <InputLabel id="label-audio-output" shrink>
              Altavoces
            </InputLabel>
            <Select
              labelId="label-audio-output"
              id="select-audio-output"
              onChange={handleAudioOutputChange}
              className={classes.selectEmpty}
              value=""
              displayEmpty
              renderValue={() => (
                <Text className={classes.option} variant="body2">
                  {audioOutput.label}
                </Text>
              )}
            >
              {audioOutputs.map((output, index) => {
                const { label, deviceId } = output

                return (
                  <MenuItem label={label} value={deviceId} key={index}>
                    <Text className={classes.option} variant="body2">
                      {label}
                    </Text>
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center">
            {audioOutputTest ? (
              <Button
                onClick={() => {
                  setAudioOutputTest(false)
                  audioTest.play()
                  audioTest.addEventListener('ended', handleAudioTestEnd)
                }}
                startIcon={<Headset />}
              >
                Probar
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setAudioOutputTest(true)
                  audioTest.pause()
                  audioTest.removeEventListener('ended', handleAudioTestEnd)
                }}
                startIcon={<Headset />}
              >
                Parar
              </Button>
            )}
          </Box>
        </FormGroup>
      </Box>
    </TabPanel>
  )
}

export default AudioPanel
