import Head from 'next/head'
import { Text, Grid, Carousel, Box, Button, Input } from 'components/ui'
// import styles from 'styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles'
import VideoCall from '@material-ui/icons/VideoCall'
import Keyboard from '@material-ui/icons/Keyboard'

const { Adornment } = Input

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: '70vh',
    width: '100%',
  },
  carousel: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    width: '100%',
  },

  hero: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '.8rem 1.5rem',
  },
  addMeetingButtom: {
    fontSize: '.5rem',
    marginRight: '.3rem',
    lineHeight: 1.5,
  },
  codeInput: {
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
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
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid className={classes.root} container alignItems="center">
        <Grid className={classes.hero} item xs={12} sm={6}>
          <Box
            my={1}
            py={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text paragraph variant="h5">
              Reuniones y congresos para todos
            </Text>
            <Text variant="body2">
              La aplicación es totalmente abierta y podrás editar streamings,
              chatear, gestionar archivos y mucho más.
            </Text>
          </Box>
          <Box
            width="100%"
            my={1}
            py={1}
            display="flex"
            alignContent="flex-start"
          >
            <Button
              className={classes.addMeetingButtom}
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<VideoCall />}
            >
              Nueva reunión
            </Button>
            <Input
              size="small"
              variant="outlined"
              placeholder="Código de reunión"
              className={classes.codeInput}
              InputProps={{
                startAdornment: (
                  <Adornment position="start">
                    <Keyboard />
                  </Adornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid className={classes.carousel} item xs={12} sm={6}>
          <Carousel carouselData={carouselData} width={300} height={180} />
        </Grid>
      </Grid>
    </>
  )
}

Home.layout = 'default'

export default Home
