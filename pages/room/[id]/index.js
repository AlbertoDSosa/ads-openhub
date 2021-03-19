import { useEffect } from 'react'
import Head from 'next/head'
// import { useRouter } from 'next/router'

// import useDatabase from 'hooks/useDatabase'
import useAuth from 'hooks/useAuth'
import useRoomClient from 'hooks/useRoomClient'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from 'components/ui'

import RoomCanvas from 'components/page/RoomCanvas'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
  },
  section: {
    backgroundColor: 'black',
    border: '1px white solid',
    color: 'white',
    padding: theme.spacing(2),
  },
  canvas: {
    height: '70vh',
  },
  editor: {
    height: '30vh',
  },
}))

const RoomPage = ({ meeting }) => {
  // const router = useRouter()
  const { id } = JSON.parse(meeting)
  const { user } = useAuth()
  const classes = useStyles()

  const { roomClient, setRoomClientConstructor } = useRoomClient()

  useEffect(() => {
    if (roomClient) {
      console.log(roomClient)
    }
  }, [roomClient])

  useEffect(() => {
    if (user) {
      console.log(user)
      setRoomClientConstructor({
        roomId: id,
        displayName: user.displayName,
        handlerName: user.displayName,
      })
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={`${classes.section} ${classes.canvas}`}>
          <RoomCanvas template="meeting" />
        </Grid>
        <Grid
          item
          xs={12}
          className={`${classes.section} ${classes.callActions}`}
        ></Grid>
        <Grid
          item
          xs={12}
          className={`${classes.section} ${classes.editor}`}
        ></Grid>
      </Grid>
    </>
  )
}

export default RoomPage

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
