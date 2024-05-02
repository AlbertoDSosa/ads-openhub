import { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useMediaSettings } from 'contexts/MediaSettings'
import useDevices from 'hooks/useDevices'

import Divider from '@material-ui/core/Divider'

import IconButton from '@material-ui/core/IconButton'
import Videocam from '@material-ui/icons/VideocamOutlined'
import Speaker from '@material-ui/icons/SpeakerOutlined'
import Close from '@material-ui/icons/Close'

import { Modal, Grid, Text, Box } from 'components/ui'
import Tabs, { Tab as UiTab } from 'components/ui/Tabs'

import AudioPanel from './AudioPanel'
import VideoPanel from './VideoPanel'

const { Content: ModalContent, Title: ModalTitle } = Modal

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  const {
    currentDevices,
    audioConstraints,
    videoConstraints,
  } = useMediaSettings()

  const [tap, setTap] = useState(0)
  const [mediaSettings, setMediaSettings] = useState(null)

  const handleTabChange = (evt, newTap) => {
    setTap(newTap)
  }

  useEffect(() => {
    if (mediaDevices && currentDevices) {
      const { audioInputs, audioOutputs, videoInputs } = mediaDevices
      const { audioInput, audioOutput, videoInput } = currentDevices
      setMediaSettings({
        currentAudioDevices: {
          audioInput,
          audioOutput,
        },
        audioDevices: {
          audioInputs,
          audioOutputs,
        },
        audioConstraints,
        videoConstraints,
        videoInputs,
        videoInput,
      })
    }
  }, [mediaDevices, currentDevices])

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
            {mediaSettings && (
              <AudioPanel value={tap} index={0} mediaSettings={mediaSettings} />
            )}
            {mediaSettings && (
              <VideoPanel value={tap} index={1} mediaSettings={mediaSettings} />
            )}
          </Grid>
        </Grid>
      </Content>
    </Modal>
  )
}

export default SettingsModal
