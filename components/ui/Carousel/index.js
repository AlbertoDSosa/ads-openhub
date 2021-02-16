import { useState } from 'react'

import { Image, Box } from 'components/ui'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

const useStyles = makeStyles((theme) => ({
  gridList: (props) => ({
    flexWrap: 'nowrap',
    overflow: 'hidden',
    borderRadius: '10px',
    width: props.gridListWidth,
    height: props.gridListHeight,
    transform: 'translateY(0)',
  }),
  slide: (props) => ({
    transform: `translateY(0) translateX(${props.slide}%)`,
    transition: '0.5s',
  }),
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
  },
  slideOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    padding: '0 !important',
  },
  directionButton: {
    position: 'absolute',
    top: 80,
    height: '2rem',
    width: '2rem',
  },
  nextButton: {
    right: 5,
  },
  backButton: {
    left: 7,
  },
}))

export default function CustomCarrusel({
  carouselData = [],
  width = '300',
  height = '180',
}) {
  const [slide, setSlide] = useState(0)
  const styleProps = {
    gridListWidth: width,
    gridListHeight: height,
    slide,
  }

  const goBack = () => {
    slide === 0
      ? setSlide(-100 * (carouselData.length - 1))
      : setSlide(slide + 100)
  }

  const goNext = () => {
    slide === -100 * (carouselData.length - 1)
      ? setSlide(0)
      : setSlide(slide - 100)
  }

  const classes = useStyles(styleProps)

  return (
    <GridList cellHeight="auto" className={classes.gridList} cols={1}>
      {carouselData.map((tile) => (
        <GridListTile className={classes.slide} key={tile.id}>
          <Image
            src={tile.img}
            alt={tile.title}
            width={tile.width}
            height={tile.height}
          />
          <GridListTileBar
            title={tile.title}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton aria-label={`star ${tile.title}`}>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
      <Box p={0} className={classes.slideOverlay}>
        <IconButton
          onClick={goBack}
          className={`${classes.directionButton} ${classes.backButton}`}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={goNext}
          className={`${classes.directionButton} ${classes.nextButton}`}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </GridList>
  )
}
