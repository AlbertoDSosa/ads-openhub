import { Fragment } from 'react'
import DefaultLayout from './templates/Default'

const layouts = {
  default: DefaultLayout,
}

const LayoutWrapper = (props) => {
  const Layout = layouts[props.children.type.layout]

  if (Layout != null) {
    return <Layout {...props}>{props.children}</Layout>
  }

  return <Fragment {...props}>{props.children}</Fragment>
}

export default LayoutWrapper
