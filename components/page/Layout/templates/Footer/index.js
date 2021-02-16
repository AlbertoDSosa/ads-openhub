import { Box } from 'components/ui'

export default function Footer(props) {
  return (
    <Box component="footer" {...props}>
      <a
        href="https://albertodsosa.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Alberto D.Sosa
      </a>
    </Box>
  )
}
