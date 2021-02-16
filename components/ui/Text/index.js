import Typography from '@material-ui/core/Typography'

export default function CustomText({ children, ...rest }) {
  return <Typography {...rest}>{children}</Typography>
}
