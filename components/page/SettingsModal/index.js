import { useState, useContext } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Videocam from '@material-ui/icons/VideocamOutlined'
import Speaker from '@material-ui/icons/SpeakerOutlined'
import Headset from '@material-ui/icons/HeadsetOutlined'
import Close from '@material-ui/icons/Close'
import { MicNone, MoreHoriz } from '@material-ui/icons'
import { Modal, Grid, Text, Menu, Input, Box, Button } from 'components/ui'
import Tabs, { Tab as UiTab, TabPanel } from 'components/ui/Tabs'
import { FormControl, Select, FormGroup } from 'components/ui/Form'
import useDevices from 'hooks/useDevices'
import MediaSettingsContext from 'contexts/MediaSettings'
import Camera from 'components/page/CameraPlayer'

const { Content: ModalContent, Title: ModalTitle } = Modal
const { Item: MenuItem } = Menu
const { InputLabel } = Input

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60vh',
  },
  section: {
    padding: theme.spacing(0.5),
  },
  closeButton: {
    position: 'absolute',
    padding: '.2rem',
    right: 3,
    top: 3,
    color: theme.palette.grey[500],
    '& span': {
      '& svg': {
        fontSize: '1rem',
      },
    },
  },
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

const Content = withStyles((theme) => ({
  root: {
    height: '60vh',
    padding: theme.spacing(0.5),
    '&:first-child': {
      paddingTop: theme.spacing(0.5),
    },
  },
}))(ModalContent)

const Tab = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    textTransform: 'none',
    '& span': {
      '& svg': {
        marginBottom: '0 !important',
        marginRight: theme.spacing(1),
      },
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'normal',
  },
  labelIcon: {
    minHeight: 0,
  },
}))(UiTab)

const Title = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(ModalTitle)

function SettingsModal({ showModal, onClose, label, description }) {
  const classes = useStyles()
  const { mediaDevices } = useDevices()
  const [tap, setTap] = useState(0)

  const { changeVideoSource, changeAudioSource } = useContext(
    MediaSettingsContext
  )
  const [audioInput, setAudioInput] = useState('default')
  const [audioOutput, setAudioOutput] = useState('default')
  const [videoInput, setVideoInput] = useState('default')

  const handleTabChange = (evt, newTap) => {
    setTap(newTap)
  }

  const handleVideoSourceChange = (evt, el) => {
    const { value, device } = el.props
    const { deviceId: id } = device
    setVideoInput(value)
    changeVideoSource({ id })
  }
  const handleAudioSourceChange = (evt, el) => {
    const { value, device } = el.props
    const { deviceId: id } = device
    setAudioInput(value)
    changeAudioSource({ id })
  }

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby={label}
      aria-describedby={description}
      fullWidth
    >
      <Content>
        <Grid container display="flex">
          <Grid item xs={4} sm={3} md={3} lg={3} className={classes.section}>
            <Box
              display={{
                xs: 'none',
                sm: 'block',
                md: 'block',
                lg: 'block',
                xl: 'block',
              }}
            >
              <Title disableTypography>
                <Text variant="subtitle1">Configuración</Text>
              </Title>
            </Box>
            <Tabs orientation="vertical" value={tap} onChange={handleTabChange}>
              <Tab icon={<Speaker />} label="Audio" />
              <Tab icon={<Videocam />} label="Video" />
            </Tabs>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={7} sm={8} md={8} lg={8} className={classes.section}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <Close />
            </IconButton>
            <TabPanel value={tap} index={0}>
              <Box p={1} display="flex" flexDirection="column" width="100%">
                <FormGroup row>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="label-audio-input" shrink>
                      Micrófono
                    </InputLabel>
                    <Select
                      onChange={handleAudioSourceChange}
                      labelId="label-audio-input"
                      id="select-audio-input"
                      className={classes.selectEmpty}
                      value={audioInput}
                    >
                      {mediaDevices &&
                        mediaDevices.audioInputs.map((input) => {
                          const { label, deviceId } = input

                          return (
                            <MenuItem
                              device={input}
                              value={deviceId}
                              key={deviceId}
                            >
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
                      id="select-audio-input"
                      value={audioOutput}
                      onChange={(e, el) => {
                        setAudioOutput(el.props.value)
                      }}
                      className={classes.selectEmpty}
                    >
                      {mediaDevices &&
                        mediaDevices.audioOutputs.map((output) => {
                          const { label, deviceId } = output

                          return (
                            <MenuItem
                              device={output}
                              value={deviceId}
                              key={deviceId}
                            >
                              <Text className={classes.option} variant="body2">
                                {label}
                              </Text>
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                  <Box display="flex" alignItems="center">
                    <Button startIcon={<Headset />}>Probar</Button>
                  </Box>
                </FormGroup>
              </Box>
            </TabPanel>
            <TabPanel value={tap} index={1}>
              <Box p={1} display="flex" flexDirection="column">
                <FormControl className={classes.formControl}>
                  <InputLabel id="input-label-video-input" shrink>
                    Cámara
                  </InputLabel>
                  <Select
                    labelId="label-video-input"
                    id="select-video-input"
                    onChange={handleVideoSourceChange}
                    value={videoInput}
                    className={classes.selectEmpty}
                  >
                    <MenuItem
                      device={{ deviceId: 'default' }}
                      value="default"
                      key="default"
                    >
                      <Text className={classes.option} variant="body2">
                        Predeterminado
                      </Text>
                    </MenuItem>
                    {mediaDevices &&
                      mediaDevices.videoInputs.map((input) => {
                        const { label, deviceId } = input
                        return (
                          <MenuItem
                            device={input}
                            value={deviceId}
                            key={deviceId}
                          >
                            <Text className={classes.option} variant="body2">
                              {label}
                            </Text>
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
                <Camera />
              </Box>
            </TabPanel>
          </Grid>
        </Grid>
      </Content>
    </Modal>
  )
}

export default SettingsModal
