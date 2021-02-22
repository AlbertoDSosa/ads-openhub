import DefaultLayout from './templates/Default'

const layouts = {
  default: DefaultLayout,
}

const LayoutWrapper = (props) => {
  const Layout = layouts[props.children.type.layout]

  if (Layout != null) {
    return <Layout {...props}>{props.children}</Layout>
  }

  return <div {...props}>{props.children}</div>
}

export default LayoutWrapper
