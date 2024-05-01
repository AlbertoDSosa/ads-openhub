import { makeStyles } from '@material-ui/core/styles'
import { Box } from 'components/ui'
import MicTest from 'components/page/MicTest'

import Mic from '@material-ui/icons/Mic'
import MicOff from '@material-ui/icons/MicOff'
import Videocam from '@material-ui/icons/Videocam'
import VideocamOff from '@material-ui/icons/VideocamOff'

import IconButton from '@material-ui/core/IconButton'
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

function CameraWindow({
  audioTrack,
  videoTrack,
  isCameraActive,
  isMicActive,
  toggleCameraActive,
  toggleMicActive,
}) {
  const classes = useStyles()

  return (
    <Box
      position="relative"
      fontSize={{ xs: '.55rem', sm: '.7rem', md: '.9rem', lg: '1rem' }}
      width={320}
      height={240}
      m={2}
    >
      <Box bgcolor="black" width={320} height={240} borderRadius="borderRadius">
        <CameraPlayer mediaTrack={videoTrack} />
      </Box>

      <Box
        position="absolute"
        bottom={5}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <IconButton
          onClick={() => toggleMicActive(!isMicActive)}
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
          onClick={() => toggleCameraActive(!isCameraActive)}
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
        <MicTest mediaTrack={audioTrack} borderColor="white" />
      </Box>
    </Box>
  )
}

export default CameraWindow
