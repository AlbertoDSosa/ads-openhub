import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

const CustomModal = (props) => {
  return <Dialog {...props} />
}

CustomModal.Actions = DialogActions
CustomModal.Content = DialogContent
CustomModal.ContentText = DialogContentText
CustomModal.Title = DialogTitle

export default CustomModal
