import { useState } from 'react'
import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Text, Box, Button, Menu } from 'components/ui'

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
// import CameraPlayer from 'components/page/CameraPlayer'

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
  const classes = useStyles()
  // const { id } = JSON.parse(meeting)

  const [anchorEl, setAnchorEl] = useState(null)
  const [isCameraActive, setIsCameraActive] = useState(true)
  const [isAudioActive, setIsAudioActive] = useState(true)

  const handleOpenOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null)
  }

  const toggleCameraActive = () => {
    setIsCameraActive(!isCameraActive)
  }

  const toggleAudioActive = () => {
    setIsAudioActive(!isAudioActive)
  }

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
              bgcolor="black"
              width="32em"
              height="18em"
              borderRadius="borderRadius"
            >
              {/* <CameraPlayer /> */}
            </Box>
            <Box
              position="absolute"
              bottom={5}
              width="100%"
              display="flex"
              justifyContent="center"
            >
              <IconButton
                onClick={toggleAudioActive}
                className={classes.videoActions}
                style={
                  isAudioActive
                    ? {}
                    : {
                        backgroundColor: 'red',
                        border: '1px solid transparent',
                      }
                }
              >
                {isAudioActive ? <Mic /> : <MicOff />}
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
    const res = await fetch(`http://${host}/api/meetings/${id}`)
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
