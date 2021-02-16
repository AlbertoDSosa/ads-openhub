import { Menu, MenuItem } from '@material-ui/core'

const CustomMenu = (props) => {
  return <Menu {...props} />
}

CustomMenu.Item = MenuItem

export default CustomMenu
