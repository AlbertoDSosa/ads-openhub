import Container from '@material-ui/core/Container'

export default function CustomContainer({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>
}
