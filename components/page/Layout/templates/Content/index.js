import { Box } from 'components/ui'

export default function Content({ children, ...rest }) {
  return (
    <Box component="main" {...rest}>
      {children}
    </Box>
  )
}
