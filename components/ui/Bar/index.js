import { AppBar, Toolbar } from '@material-ui/core'

export default function CustomBar({ children, ...rest }) {
  return (
    <AppBar {...rest}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  )
}
