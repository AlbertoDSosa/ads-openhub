import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'

import useUserMedia from 'hooks/useUserMedia'
import MediaSettingsContext from 'contexts/MediaSettings'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Text, Box, Button, Menu } from 'components/ui'
import MicTest from 'components/page/MicTest'

import Mic from '@material-ui/icons/Mic'
import MicOff from '@material-ui/icons/MicOff'
import Videocam from '@material-ui/icons/Videocam'
import VideocamOff from '@material-ui/icons/VideocamOff'
import MoreVert from '@material-ui/icons/MoreVert'
import SettingsOutlined from '@material-ui/icons/SettingsOutlined'
import FeedbackOutlined from '@material-ui/icons/FeedbackOutlined'
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined'
import HelpOutlineOutlined from '@material-ui/icons/HelpOutlineOutlined'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CameraPlayer from 'components/page/CameraPlayer'

const useStyles = makeStyles((theme) => ({
  root: {},
  cameraOptions: {
    position: 'absolute',
    right: 10,
    top: 10,
    '&:hover': {
      background: 'rgb(245, 245 , 245, 0.3)',
      borderRadius: '50%',
    },
  },
  cameraOptionsButton: {
    color: 'white',
  },
  videoActions: {
    color: 'white',
    border: '1px solid',
    margin: '.8rem',
  },
}))

const { Item } = Menu

const Hall = ({ meeting }) => {
  // const { id } = JSON.parse(meeting)
  const classes = useStyles()
  const {
    videoConstraints,
    audioConstraints,
    currentDevices,
    toggleAudioActive,
    toggleVideoActive,
  } = useContext(MediaSettingsContext)

  const [videoStream] = useUserMedia(videoConstraints)
  const [audioStream] = useUserMedia(audioConstraints)
  // const { currentTracks, tracks } = useTracks({ videoStream })

  const { videoInput, audioInput } = currentDevices

  const [anchorEl, setAnchorEl] = useState(null)
  const [isCameraActive, setIsCameraActive] = useState(true)
  const [isMicActive, setIsMicActive] = useState(true)

  const handleOpenOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null)
  }

  const toggleCameraActive = () => {
    toggleVideoActive({
      active: !isCameraActive,
      deviceId: videoInput.deviceId,
    })
    setIsCameraActive(!isCameraActive)
  }

  const toggleMicActive = () => {
    toggleAudioActive({ active: !isMicActive, deviceId: audioInput.deviceId })
    setIsMicActive(!isMicActive)
  }

  useEffect(() => {
    setIsMicActive(!!audioConstraints)
    setIsCameraActive(!!videoConstraints)
  }, [])

  return (
    <>
      <Head>
        <title>Hall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        display="flex"
        justify="space-evenly"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Box
            position="relative"
            fontSize={{ xs: '.55rem', sm: '.7rem', md: '.9rem', lg: '1rem' }}
            m={2}
          >
            <Box
              bgcolor="black"
              width={320}
              height={240}
              borderRadius="borderRadius"
            >
              <CameraPlayer mediaStream={videoStream} />
            </Box>
            <Box p={0.5} className={classes.cameraOptions}>
              <Tooltip title="Más opciones">
                <IconButton
                  size="small"
                  className={classes.cameraOptionsButton}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleOpenOptionsMenu}
                >
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseOptionsMenu}
              >
                <Item>
                  <Box component="span" lineHeight={1} mr={1.5}>
                    <SettingsOutlined />
                  </Box>
                  <Text variant="body2">Configuración</Text>
                </Item>
                <Item>
                  <Box component="span" lineHeight={1} mr={1.5}>
                    <FeedbackOutlined />
                  </Box>
                  <Text variant="body2">Notificar de un problema</Text>
                </Item>
                <Item>
                  <Box component="span" lineHeight={1} mr={1.5}>
                    <ErrorOutlineOutlined />
                  </Box>
                  <Text variant="body2">Notificar uso inadecuado</Text>
                </Item>
                <Item>
                  <Box component="span" lineHeight={1} mr={1.5}>
                    <HelpOutlineOutlined />
                  </Box>
                  <Text variant="body2">Solución de problemas y ayuda</Text>
                </Item>
              </Menu>
            </Box>
            <Box
              position="absolute"
              bottom={5}
              width="100%"
              display="flex"
              justifyContent="center"
            >
              <IconButton
                onClick={toggleMicActive}
                className={classes.videoActions}
                style={
                  isMicActive
                    ? {}
                    : {
                        backgroundColor: 'red',
                        border: '1px solid transparent',
                      }
                }
              >
                {isMicActive ? <Mic /> : <MicOff />}
              </IconButton>
              <IconButton
                onClick={toggleCameraActive}
                className={classes.videoActions}
                style={
                  isCameraActive
                    ? {}
                    : {
                        backgroundColor: 'red',
                        border: '1px solid transparent',
                      }
                }
              >
                {isCameraActive ? <Videocam /> : <VideocamOff />}
              </IconButton>
            </Box>
            <Box position="absolute" top={6}>
              <MicTest mediaStream={audioStream} borderColor="white" />
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            m={2}
          >
            <Text variant="h6" color="textPrimary">
              ¿Todo listo para unirte?
            </Text>
            <Box my={2} textAlign="center">
              <Text>Aún no ha llegado nadie</Text>
            </Box>
            <Button variant="contained" color="primary">
              Unirse ahora
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

Hall.layout = 'default'

export default Hall

export async function getServerSideProps({ params, req }) {
  const { id } = params

  const { host } = req.headers

  try {
    const res = await fetch(`https://${host}/api/meetings/${id}`)
    const meeting = await res.json()

    return {
      props: {
        meeting: JSON.stringify(meeting.data),
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
