import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MediaSettingsContext from 'contexts/MediaSettings'
import useUserMedia from 'hooks/useUserMedia'

import { TabPanel } from 'components/ui/Tabs'
import { FormControl, Select } from 'components/ui/Form'
import { Text, Menu, Input, Box } from 'components/ui'

import Camera from 'components/page/CameraPlayer'

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

function VideoPanel({ value, index, mediaSettings }) {
  const classes = useStyles()
  const { changeVideoInput, videoConstraints } = useContext(
    MediaSettingsContext
  )
  const [mediaStream] = useUserMedia(videoConstraints)
  const { videoInput, videoInputs } = mediaSettings
  const handleVideoSourceChange = (evt, el) => {
    const { value, label } = el.props
    changeVideoInput({ deviceId: value, label })
  }

  return (
    <TabPanel value={value} index={index}>
      <Box p={1} display="flex" flexDirection="column">
        <FormControl className={classes.formControl}>
          <InputLabel id="input-label-video-input" shrink>
            Cámara
          </InputLabel>
          <Select
            labelId="label-video-input"
            id="select-video-input"
            onChange={handleVideoSourceChange}
            className={classes.selectEmpty}
            value=""
            displayEmpty
            renderValue={() => (
              <Text className={classes.option} variant="body2">
                {videoInput.label}
              </Text>
            )}
          >
            <MenuItem label="Predeterminado" value="default">
              <Text className={classes.option} variant="body2">
                Predeterminado
              </Text>
            </MenuItem>
            {videoInputs.map((input, index) => {
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
        <Camera mediaStream={mediaStream} />
      </Box>
    </TabPanel>
  )
}

export default VideoPanel
