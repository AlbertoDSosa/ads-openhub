import React from 'react'
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

const { Content: ModalContent, Title: ModalTitle } = Modal
const { Item: MenuItem } = Menu
const { InputLabel } = Input

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
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
}))

const Content = withStyles((theme) => ({
  root: {
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
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  console.log(mediaDevices)
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
          <Grid item md={4} lg={4} className={classes.section}>
            <Title disableTypography>
              <Text variant="subtitle1">Configuración</Text>
            </Title>
            <Tabs orientation="vertical" value={value} onChange={handleChange}>
              <Tab icon={<Speaker />} label="Audio" />
              <Tab icon={<Videocam />} label="Video" />
            </Tabs>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item md={8} lg={8} className={classes.section}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <Close />
            </IconButton>
            <TabPanel value={value} index={0}>
              <Box p={1} display="flex" flexDirection="column">
                <FormGroup row>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Micrófono
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      onChange={handleChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                    </Select>
                  </FormControl>
                  <Box display="flex" alignItems="center">
                    <MicNone /> <MoreHoriz />
                  </Box>
                </FormGroup>
                <FormGroup row>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Altavoces
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      onChange={handleChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <Box display="flex" alignItems="center">
                    <Button startIcon={<Headset />}>Probar</Button>
                  </Box>
                </FormGroup>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box p={1} display="flex" flexDirection="column">
                <FormControl className={classes.formControl}>
                  <InputLabel
                    shrink
                    id="demo-simple-select-placeholder-label-label"
                  >
                    Cámara
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </TabPanel>
          </Grid>
        </Grid>
      </Content>
    </Modal>
  )
}

export default SettingsModal
