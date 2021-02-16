import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

const CustomList = (props) => {
  return <List {...props} />
}

CustomList.Item = ListItem
CustomList.Avatar = ListItemAvatar
CustomList.Text = ListItemText
CustomList.Icon = ListItemIcon

export default CustomList
