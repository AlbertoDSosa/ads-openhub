import Grid from '@material-ui/core/Grid'

const CustomGrid = ({ children, ...rest }) => {
  return <Grid {...rest}>{children}</Grid>
}

export default CustomGrid
