import React from 'react'
import { Modal, Box, Text } from 'components/ui'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const { Content: ModalContent, ContentText, Title: ModalTitle } = Modal

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const Title = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <ModalTitle disableTypography className={classes.root} {...other}>
      <Text variant="h6">{children}</Text>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </ModalTitle>
  )
})

const Content = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(ModalContent)

function MeetingInfoModal({
  showModal,
  onClose,
  label,
  description,
  meetingCode,
}) {
  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby={label}
      aria-describedby={description}
    >
      <Title onClose={onClose}>Información de la reunión</Title>
      <Content>
        <ContentText>
          Copia el código y compartelo con quien quieras o guardalo para acceder
          más tarde.
        </ContentText>
        <Box bgcolor="text.disabled" p={1.5}>
          {meetingCode}
        </Box>
      </Content>
    </Modal>
  )
}

export default MeetingInfoModal
