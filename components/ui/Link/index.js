import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

export default function CustomLink(props) {
  const { config = {}, to, as = '', children, ...rest } = props
  const { type = 'nav' } = config

  if (type === 'nav') {
    return (
      <NextLink href={to} as={as} {...rest} passHref>
        <MuiLink>{children}</MuiLink>
      </NextLink>
    )
  }

  return (
    <MuiLink href={to} {...rest}>
      {children}
    </MuiLink>
  )
}
