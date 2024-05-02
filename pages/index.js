import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useDatabase from 'hooks/useDatabase'
import useAuth from 'hooks/useAuth'

import { Text, Grid, Carousel, Box, Button, Input, Menu } from 'components/ui'

// import styles from 'styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles'
import VideoCall from '@material-ui/icons/VideoCall'
import Keyboard from '@material-ui/icons/Keyboard'
import InsertLink from '@material-ui/icons/InsertLink'
import Add from '@material-ui/icons/Add'
import CalendarToday from '@material-ui/icons/CalendarToday'

import MeetingInfoModal from 'components/page/MeetingInfoModal'

const { Adornment } = Input
const { Item: MenuItem } = Menu

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: '70vh',
    width: '100%',
  },
  carousel: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
    padding: theme.spacing(1),
    width: '100%',
  },
  hero: {
    padding: '.8rem 1.5rem',
  },
  addMeetingButtom: {
    padding: '.64rem .8rem',
    marginRight: '.3rem',
    lineHeight: 1.5,
  },
  codeInput: {
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
    marginRight: '.3rem',
  },
}))

const carouselData = [
  {
    id: 1,
    img: '/images/video-conference-home.webp',
    title: 'Picture 1',
    author: 'author 1',
    width: 503,
    height: 340,
  },
  {
    id: 2,
    img: '/images/video-conference-home.webp',
    title: 'Picture 2',
    author: 'author 2',
    width: 503,
    height: 340,
  },
  {
    id: 3,
    img: '/images/video-conference-home.webp',
    title: 'Picture 3',
    author: 'author 3',
    width: 503,
    height: 340,
  },
]

const Home = () => {
  const classes = useStyles()
  const router = useRouter()
  const Meeting = useDatabase({ collection: 'meetings' })
  const [meetingCode, setMeetingCode] = useState('')
  const [inputMeetingCodeDisabled, setInputMeetingCodeDisabled] = useState(
    false
  )
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false)
  const [meetingCodeExist, setMeetingCodeExist] = useState(false)
  const { user } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenNewMeetingMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseNewMeetingMenu = () => {
    setAnchorEl(null)
  }

  const handleChangeMeetingCode = (evt) => {
    if (evt.target.value.length) {
      setMeetingCodeExist(true)
      setMeetingCode(evt.target.value)
    } else {
      setMeetingCodeExist(false)
    }
  }

  const goToHallMeeting = () => {
    Meeting.get({ id: meetingCode })
      .then((meeting) => {
        router.push(`/hall/${meeting.id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const goToRoomMeeting = ({ id }) => {
    setMeetingCode(id)
    setInputMeetingCodeDisabled(true)
    setMeetingCodeExist(false)
    router.push(`/room/${id}`)
  }
  const handleNewMeetingInfo = ({ id }) => {
    setMeetingCode(id)
    setShowNewMeetingModal(true)
  }

  const createNewMeeting = (action) => {
    Meeting.add({ user: user.id })
      .then((id) => {
        if (action === 'now') {
          goToRoomMeeting({ id })
        } else if (action === 'later') {
          handleNewMeetingInfo({ id })
        }
        handleCloseNewMeetingMenu()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container className={classes.root} alignItems="center">
        <Grid className={classes.hero} item xs={12} sm={7}>
          <Box
            my={1}
            py={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text paragraph variant="h5">
              Reuniones para todos
            </Text>
            <Text variant="body2">
              La aplicación es totalmente abierta y podrás chatear con quien quieras.
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            my={1} py={1}
          >
            <Box mb={1}>
              <Button
                className={classes.addMeetingButtom}
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<VideoCall />}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpenNewMeetingMenu}
              >
                Nueva reunión
              </Button>
            </Box>
            <Box>
              <Input
                size="small"
                variant="outlined"
                placeholder="Código de reunión"
                className={classes.codeInput}
                onChange={handleChangeMeetingCode}
                disabled={inputMeetingCodeDisabled}
                InputProps={{
                  startAdornment: (
                    <Adornment position="start">
                      <Keyboard />
                    </Adornment>
                  ),
                }}
              />
            </Box>
            <Button
              disabled={!meetingCodeExist}
              onClick={() => goToHallMeeting()}
            >
              Entrar
            </Button>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseNewMeetingMenu}
          >
            <MenuItem
              id="meeting-info-modal"
              onClick={() => createNewMeeting('later')}
            >
              <Box component="span" lineHeight={1} mr={1.5}>
                <InsertLink />
              </Box>
              <Box>Crear una reunión para más tarde</Box>
            </MenuItem>
            <MenuItem onClick={() => createNewMeeting('now')}>
              <Box component="span" lineHeight={1} mr={1.5}>
                <Add />
              </Box>
              <Box>Iniciar una reunión</Box>
            </MenuItem>
            <MenuItem onClick={handleCloseNewMeetingMenu}>
              <Box component="span" lineHeight={1} mr={1.5}>
                <CalendarToday />
              </Box>
              <Box>Programar reunión en el calendario</Box>
            </MenuItem>
          </Menu>
          <MeetingInfoModal
            showModal={showNewMeetingModal}
            onClose={() => setShowNewMeetingModal(false)}
            label="meeting-info-modal"
            meetingCode={meetingCode}
          />
        </Grid>
        <Grid className={classes.carousel} item xs={12} sm={5}>
          <Carousel carouselData={carouselData} width={503} height={340} />
        </Grid>
      </Grid>
    </>
  )
}

Home.layout = 'default'

export default Home
